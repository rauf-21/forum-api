import { Insertable } from "kysely";
import { Comments } from "kysely-codegen";

import { db } from "../src/infrastructures/database/postgres/db";

export const CommentsTableTestHelper = {
  async addComment(insertableComment: Insertable<Comments>) {
    await db.insertInto("comments").values(insertableComment).execute();
  },
  async findCommentById(id: Comments["id"]) {
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
