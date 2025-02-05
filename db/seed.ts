import { db, Likes } from "astro:db";

export default async function seed() {
	await db.insert(Likes).values({
		postId: "first-post.md",
		likes: 6,
	});
}
