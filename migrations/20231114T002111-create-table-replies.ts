import { Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createTable("replies")
    .addColumn("id", "varchar(50)", (col) => col.primaryKey())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("date", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("is_deleted", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("owner", "varchar(50)", (col) => col.notNull())
    .addColumn("comment_id", "varchar(50)", (col) => col.notNull())
    .addForeignKeyConstraint("fk_owner", ["owner"], "users", ["id"], (col) =>
      col.onDelete("cascade")
    )
    .addForeignKeyConstraint(
      "fk_comment_id",
      ["comment_id"],
      "comments",
      ["id"],
      (col) => col.onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.alterTable("replies").dropConstraint("fk_owner").execute();
  await db.schema
    .alterTable("replies")
    .dropConstraint("fk_comment_id")
    .execute();
  await db.schema.dropTable("replies").execute();
}
