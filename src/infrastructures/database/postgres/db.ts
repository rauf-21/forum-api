import DotenvExpand from "dotenv-expand";
import DotenvFlow from "dotenv-flow";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { DB } from "kysely-codegen";
import { ConnectionConfig, Pool } from "pg";

import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_SSL_MODE,
  DATABASE_USER,
} from "../../../commons/constants/infrastructures/database";

DotenvExpand.expand(DotenvFlow.config());

type SSLMode = "require";

const sslValueByMode: Record<SSLMode, ConnectionConfig["ssl"]> = {
  require: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  ssl: DATABASE_SSL_MODE
    ? sslValueByMode[DATABASE_SSL_MODE as SSLMode]
    : undefined,
});

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<DB>({ dialect, plugins: [new CamelCasePlugin()] });
