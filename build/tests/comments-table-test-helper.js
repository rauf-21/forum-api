"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsTableTestHelper = void 0;
const db_1 = require("../src/infrastructures/database/postgres/db");
exports.CommentsTableTestHelper = {
    async addComment(insertableComment) {
        await db_1.db.insertInto("comments").values(insertableComment).execute();
    },
    async findCommentById(id) {
        const foundComment = await db_1.db
            .selectFrom("comments")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
        return foundComment;
    },
    async cleanTable() {
        await db_1.db.deleteFrom("comments").execute();
    },
};
