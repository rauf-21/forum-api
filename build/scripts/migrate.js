"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
const fs_1 = require("fs");
const kysely_1 = require("kysely");
const kysely_migration_cli_1 = require("kysely-migration-cli");
const path = __importStar(require("path"));
const db_1 = require("../src/infrastructures/database/postgres/db");
dotenv_expand_1.default.expand(dotenv_flow_1.default.config());
(() => {
    const migrator = new kysely_1.Migrator({
        db: db_1.db,
        provider: new kysely_1.FileMigrationProvider({
            fs: fs_1.promises,
            path,
            migrationFolder: path.join(__dirname, "../migrations"),
        }),
    });
    (0, kysely_migration_cli_1.run)(db_1.db, migrator);
})();
