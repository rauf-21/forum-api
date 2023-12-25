"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_LOGIN_ERROR_MESSAGE = exports.USER_LOGIN_ERROR = void 0;
const prefix = "USER_LOGIN_ERROR";
exports.USER_LOGIN_ERROR = {
    MISSING_PROPERTY: `${prefix}.MISSING_PROPERTY`,
    INVALID_DATA_TYPE: `${prefix}.INVALID_DATA_TYPE`,
};
exports.USER_LOGIN_ERROR_MESSAGE = {
    MISSING_PROPERTY: "must send a username and password",
    INVALID_DATA_TYPE: "the username and password must be a type of string",
};
