import { Insertable } from "kysely";
import { Replies } from "kysely-codegen";

import { db } from "../src/infrastructures/database/postgres/db";

export const RepliesTableTestHelper = {
  async addReply(insertableReply: Insertable<Replies>) {
    await db.insertInto("replies").values(insertableReply).execute();
  },
  async findReplyById(id: Replies["id"]) {
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
