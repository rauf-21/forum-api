import { sql } from "kysely";
import { Authentications } from "kysely-codegen";

import { db } from "../src/infrastructures/database/postgres/db";

export const AuthenticationsTableTestHelper = {
  async addToken(token: Authentications["token"]) {
    await db.insertInto("authentications").values({ token }).execute();
  },
  async findToken(token: Authentications["token"]) {
    const result = await db
      .selectFrom("authentications")
      .select("token")
      .where("token", "=", token)
      .executeTakeFirst();

    return result !== undefined ? result.token : result;
  },
  async cleanTable() {
    await sql`TRUNCATE TABLE ${sql.table("authentications")}`.execute(db);
  },
};
