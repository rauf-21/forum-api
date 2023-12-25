"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE = exports.DELETE_AUTHENTICATION_USE_CASE_ERROR = void 0;
const prefix = "DELETE_AUTHENTICATION_USE_CASE_ERROR";
exports.DELETE_AUTHENTICATION_USE_CASE_ERROR = {
    MISSING_REFRESH_TOKEN: `${prefix}.MISSING_REFRESH_TOKEN`,
    INVALID_REFRESH_TOKEN_DATA_TYPE: `${prefix}.INVALID_REFRESH_TOKEN_DATA_TYPE`,
};
exports.DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE = {
    MISSING_REFRESH_TOKEN: "must send a refresh token",
    INVALID_REFRESH_TOKEN_DATA_TYPE: "a refresh token must be a type of string",
};
