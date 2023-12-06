import { Insertable, sql } from "kysely";
import { Users } from "kysely-codegen";

import { db } from "../src/infrastructures/database/postgres/db";

export const UsersTableTestHelper = {
  async addUser(insertableUser: Insertable<Users>) {
    await db.insertInto("users").values(insertableUser).execute();
  },
  async findUserById(id: Users["id"]) {
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
