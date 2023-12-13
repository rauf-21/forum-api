import { Insertable } from "kysely";
import { CommentLikes } from "kysely-codegen";

import { db } from "../src/infrastructures/database/postgres/db";

export const CommentLikesTableTestHelper = {
  async addCommentLike(insertableCommentLike: Insertable<CommentLikes>) {
    await db.insertInto("commentLikes").values(insertableCommentLike).execute();
  },
  async findCommentLikeById(id: CommentLikes["id"]) {
    const foundCommentLike = await db
      .selectFrom("commentLikes")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return foundCommentLike;
  },
  async cleanTable() {
    await db.deleteFrom("commentLikes").execute();
  },
};
