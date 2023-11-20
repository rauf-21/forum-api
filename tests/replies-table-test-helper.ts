import { db } from "../src/infrastructures/database/postgres/db";

export const RepliesTableTestHelper = {
  async addReply({
    id,
    content = "this is a content",
    date,
    isDeleted,
    owner,
    commentId,
  }: {
    id: string;
    content?: string;
    date?: string;
    isDeleted?: boolean;
    owner: string;
    commentId: string;
  }) {
    await db
      .insertInto("replies")
      .values({
        id,
        content,
        date,
        isDeleted,
        owner,
        commentId,
      })
      .execute();
  },
  async findReplyById(id: string) {
    const foundReply = await db
      .selectFrom("replies")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return foundReply;
  },
  async cleanTable() {
    await db.deleteFrom("replies").execute();
  },
};
