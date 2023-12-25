"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(db) {
    await db.schema
        .createTable("users")
        .addColumn("id", "varchar(50)", (col) => col.primaryKey())
        .addColumn("username", "varchar(50)", (col) => col.notNull().unique())
        .addColumn("password", "text", (col) => col.notNull())
        .addColumn("fullname", "text", (col) => col.notNull())
        .execute();
}
exports.up = up;
async function down(db) {
    await db.schema.dropTable("users").execute();
}
exports.down = down;
