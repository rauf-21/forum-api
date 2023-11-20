import { sql } from "kysely";

import { db } from "../src/infrastructures/database/postgres/db";

export const UsersTableTestHelper = {
  async addUser({
    id,
    username,
    password = "secret",
    fullname = "Dicoding Indonesia",
  }: {
    id: string;
    username: string;
    password?: string;
    fullname?: string;
  }) {
    await db
      .insertInto("users")
      .values({ id, username, password, fullname })
      .execute();
  },
  async findUserById(id: string) {
    const foundUser = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return foundUser;
  },
  async cleanTable() {
    await sql`TRUNCATE TABLE ${sql.table("users")} CASCADE`.execute(db);
  },
};
