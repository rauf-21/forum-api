"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable("comment_likes")
        .addColumn("id", "varchar(50)", (col) => col.primaryKey())
        .addColumn("date", "timestamptz", (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .addColumn("comment_id", "varchar(50)", (col) => col.notNull())
        .addColumn("owner", "varchar(50)", (col) => col.notNull())
        .addForeignKeyConstraint("fk_comment_id", ["comment_id"], "comments", ["id"], (col) => col.onDelete("cascade"))
        .addForeignKeyConstraint("fk_owner", ["owner"], "users", ["id"], (col) => col.onDelete("cascade"))
        .execute();
}
exports.up = up;
async function down(db) {
    await db.schema
        .alterTable("comment_likes")
        .dropConstraint("fk_comment_id")
        .execute();
    await db.schema
        .alterTable("comment_likes")
        .dropConstraint("fk_owner")
        .execute();
    await db.schema.dropTable("comment_likes").execute();
}
exports.down = down;
