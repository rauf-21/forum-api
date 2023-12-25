"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesTableTestHelper = void 0;
const db_1 = require("../src/infrastructures/database/postgres/db");
exports.RepliesTableTestHelper = {
    async addReply(insertableReply) {
        await db_1.db.insertInto("replies").values(insertableReply).execute();
    },
    async findReplyById(id) {
        const foundReply = await db_1.db
            .selectFrom("replies")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
        return foundReply;
    },
    async cleanTable() {
        await db_1.db.deleteFrom("replies").execute();
    },
};
