"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable("threads")
        .addColumn("id", "varchar(50)", (col) => col.primaryKey())
        .addColumn("title", "text", (col) => col.notNull())
        .addColumn("body", "text", (col) => col.notNull())
        .addColumn("date", "timestamptz", (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .addColumn("owner", "varchar(50)", (col) => col.notNull())
        .addForeignKeyConstraint("fk_owner", ["owner"], "users", ["id"], (col) => col.onDelete("cascade"))
        .execute();
}
exports.up = up;
async function down(db) {
    await db.schema.alterTable("threads").dropConstraint("fk_owner").execute();
    await db.schema.dropTable("threads").execute();
}
exports.down = down;
