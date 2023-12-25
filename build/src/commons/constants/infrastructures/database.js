"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_SSL_MODE = exports.DATABASE_URL = exports.DATABASE_NAME = exports.DATABASE_PASSWORD = exports.DATABASE_USER = exports.DATABASE_PORT = exports.DATABASE_HOST = void 0;
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
dotenv_expand_1.default.expand(dotenv_flow_1.default.config());
exports.DATABASE_HOST = process.env.DATABASE_HOST;
exports.DATABASE_PORT = parseInt(process.env.DATABASE_PORT, 10);
exports.DATABASE_USER = process.env.DATABASE_USER;
exports.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
exports.DATABASE_NAME = process.env.DATABASE_NAME;
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.DATABASE_SSL_MODE = process.env.DATABASE_SSL_MODE;
