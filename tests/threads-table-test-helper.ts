import { db } from "../src/infrastructures/database/postgres/db";

export const ThreadsTableTestHelper = {
  async addThread({
    id,
    title = "this is a title",
    body = "this is a body",
    date,
    owner,
  }: {
    id: string;
    title?: string;
    body?: string;
    date?: string;
    owner: string;
  }) {
    await db
      .insertInto("threads")
      .values({ id, title, body, date, owner })
      .execute();
  },
  async findThreadById(id: string) {
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
