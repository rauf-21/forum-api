"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable("comments")
        .addColumn("id", "varchar(50)", (col) => col.primaryKey())
        .addColumn("content", "text", (col) => col.notNull())
        .addColumn("date", "timestamptz", (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .addColumn("is_deleted", "boolean", (col) => col.notNull().defaultTo(false))
        .addColumn("owner", "varchar(50)", (col) => col.notNull())
        .addColumn("thread_id", "varchar(50)", (col) => col.notNull())
        .addForeignKeyConstraint("fk_owner", ["owner"], "users", ["id"], (col) => col.onDelete("cascade"))
        .addForeignKeyConstraint("fk_thread_id", ["thread_id"], "threads", ["id"], (col) => col.onDelete("cascade"))
        .execute();
}
exports.up = up;
async function down(db) {
    await db.schema.alterTable("comments").dropConstraint("fk_owner").execute();
    await db.schema
        .alterTable("comments")
        .dropConstraint("fk_thread_id")
        .execute();
    await db.schema.dropTable("comments").execute();
}
exports.down = down;
