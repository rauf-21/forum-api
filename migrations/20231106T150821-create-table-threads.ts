import { Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>) {
  await db.schema
    .createTable("threads")
    .addColumn("id", "varchar(50)", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("body", "text", (col) => col.notNull())
    .addColumn("date", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("owner", "varchar(50)", (col) => col.notNull())
    .addForeignKeyConstraint("fk_owner", ["owner"], "users", ["id"], (col) =>
      col.onDelete("cascade")
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.alterTable("threads").dropConstraint("fk_owner").execute();
  await db.schema.dropTable("threads").execute();
}
