import { Insertable } from "kysely";
import { Threads } from "kysely-codegen";

import { db } from "../src/infrastructures/database/postgres/db";

export const ThreadsTableTestHelper = {
  async addThread(insertableThread: Insertable<Threads>) {
    await db.insertInto("threads").values(insertableThread).execute();
  },
  async findThreadById(id: Threads["id"]) {
    const foundThread = await db
      .selectFrom("threads")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return foundThread;
  },
  async cleanTable() {
    await db.deleteFrom("threads").execute();
  },
};
