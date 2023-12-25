"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/actual");
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
const kysely_codegen_1 = require("kysely-codegen");
dotenv_expand_1.default.expand(dotenv_flow_1.default.config());
async function start() {
    const cli = new kysely_codegen_1.Cli();
    await cli.run(process.argv);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
