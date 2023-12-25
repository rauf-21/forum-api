"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLikesTableTestHelper = void 0;
const db_1 = require("../src/infrastructures/database/postgres/db");
exports.CommentLikesTableTestHelper = {
    async addCommentLike(insertableCommentLike) {
        await db_1.db.insertInto("commentLikes").values(insertableCommentLike).execute();
    },
    async findCommentLikeById(id) {
        const foundCommentLike = await db_1.db
            .selectFrom("commentLikes")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
        return foundCommentLike;
    },
    async cleanTable() {
        await db_1.db.deleteFrom("commentLikes").execute();
    },
};
