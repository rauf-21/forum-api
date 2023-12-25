"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsTableTestHelper = void 0;
const db_1 = require("../src/infrastructures/database/postgres/db");
exports.ThreadsTableTestHelper = {
    async addThread(insertableThread) {
        await db_1.db.insertInto("threads").values(insertableThread).execute();
    },
    async findThreadById(id) {
        const foundThread = await db_1.db
            .selectFrom("threads")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
        return foundThread;
    },
    async cleanTable() {
        await db_1.db.deleteFrom("threads").execute();
    },
};
