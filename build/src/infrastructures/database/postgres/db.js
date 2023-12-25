"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
const kysely_1 = require("kysely");
const pg_1 = require("pg");
const database_1 = require("../../../commons/constants/infrastructures/database");
dotenv_expand_1.default.expand(dotenv_flow_1.default.config());
const sslValueByMode = {
    require: {
        rejectUnauthorized: false,
    },
};
const pool = new pg_1.Pool({
    host: database_1.DATABASE_HOST,
    port: database_1.DATABASE_PORT,
    user: database_1.DATABASE_USER,
    password: database_1.DATABASE_PASSWORD,
    database: database_1.DATABASE_NAME,
    ssl: database_1.DATABASE_SSL_MODE
        ? sslValueByMode[database_1.DATABASE_SSL_MODE]
        : undefined,
});
const dialect = new kysely_1.PostgresDialect({ pool });
exports.db = new kysely_1.Kysely({ dialect, plugins: [new kysely_1.CamelCasePlugin()] });
