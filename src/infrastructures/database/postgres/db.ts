import DotenvExpand from "dotenv-expand";
import DotenvFlow from "dotenv-flow";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { DB } from "kysely-codegen";
import { Pool } from "pg";

import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from "../../../commons/constants/infrastructures/database";

DotenvExpand.expand(DotenvFlow.config());

const pool = new Pool({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<DB>({ dialect, plugins: [new CamelCasePlugin()] });
