import { db } from "../src/infrastructures/database/postgres/db";

export const CommentsTableTestHelper = {
  async addComment({
    id,
    content = "this is a content",
    date,
    isDeleted,
    owner,
    threadId,
  }: {
    id: string;
    content?: string;
    date?: string;
    isDeleted?: boolean;
    owner: string;
    threadId: string;
  }) {
    await db
      .insertInto("comments")
      .values({
        id,
        content,
        date,
        isDeleted,
        owner,
        threadId,
      })
      .execute();
  },
  async findCommentById(id: string) {
    const foundComment = await db
      .selectFrom("comments")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return foundComment;
  },
  async cleanTable() {
    await db.deleteFrom("comments").execute();
  },
};
