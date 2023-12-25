"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationsTableTestHelper = void 0;
const kysely_1 = require("kysely");
const db_1 = require("../src/infrastructures/database/postgres/db");
exports.AuthenticationsTableTestHelper = {
    async addToken(token) {
        await db_1.db.insertInto("authentications").values({ token }).execute();
    },
    async findToken(token) {
        const result = await db_1.db
            .selectFrom("authentications")
            .select("token")
            .where("token", "=", token)
            .executeTakeFirst();
        return result !== undefined ? result.token : result;
    },
    async cleanTable() {
        await (0, kysely_1.sql) `TRUNCATE TABLE ${kysely_1.sql.table("authentications")}`.execute(db_1.db);
    },
};
