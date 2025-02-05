import { column, defineDb, defineTable } from "astro:db";

const Likes = defineTable({
  columns: {
    postId: column.text({ primaryKey: true }),
    likes: column.number(),
  },
});

export default defineDb({
  tables: { Likes },
});