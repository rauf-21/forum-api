"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(db) {
    await db.schema
        .createTable("authentications")
        .addColumn("token", "text", (col) => col.notNull())
        .execute();
}
exports.up = up;
async function down(db) {
    await db.schema.dropTable("authentications").execute();
}
exports.down = down;
