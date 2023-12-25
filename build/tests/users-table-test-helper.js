"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTableTestHelper = void 0;
const kysely_1 = require("kysely");
const db_1 = require("../src/infrastructures/database/postgres/db");
exports.UsersTableTestHelper = {
    async addUser(insertableUser) {
        await db_1.db.insertInto("users").values(insertableUser).execute();
    },
    async findUserById(id) {
        const foundUser = await db_1.db
            .selectFrom("users")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
        return foundUser;
    },
    async cleanTable() {
        await (0, kysely_1.sql) `TRUNCATE TABLE ${kysely_1.sql.table("users")} CASCADE`.execute(db_1.db);
    },
};
