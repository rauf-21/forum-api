import { Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable("comment_likes")
    .addColumn("id", "varchar(50)", (col) => col.primaryKey())
    .addColumn("date", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("comment_id", "varchar(50)", (col) => col.notNull())
    .addColumn("owner", "varchar(50)", (col) => col.notNull())
    .addForeignKeyConstraint(
      "fk_comment_id",
      ["comment_id"],
      "comments",
      ["id"],
      (col) => col.onDelete("cascade")
    )
    .addForeignKeyConstraint("fk_owner", ["owner"], "users", ["id"], (col) =>
      col.onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
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
