import { z } from 'astro:schema';
import { defineAction } from "astro:actions";
import { db, Likes, gt, sql } from "astro:db";

export const server = {
    like: defineAction({
        input: z.object({
            postId: z.string(),
            liked: z.boolean()
        }),
        handler: async ({ postId, liked }) => {
            const mutate = await db
                .insert(Likes)
                .values({
                    postId: postId,
                    likes: liked ? 1 : 0,
                })
                .onConflictDoUpdate(
                    liked
                        ? {
                            target: Likes.postId,
                            set: { likes: sql`likes + 1` }
                        }
                        : {
                            target: Likes.postId,
                            set: { likes: sql`likes -1` },
                            where: gt(Likes.likes, 0)
                        }
                )
                .returning()
                .get();

            return mutate?.likes ?? 0

        }
    }),
};
