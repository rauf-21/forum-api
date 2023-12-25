"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTHENTICATION_REPOSITORY_ERROR_MESSAGE = exports.AUTHENTICATION_REPOSITORY_ERROR = void 0;
const prefix = "AUTHENTICATION_REPOSITORY_ERROR";
exports.AUTHENTICATION_REPOSITORY_ERROR = {
    METHOD_NOT_IMPLEMENTED: `${prefix}.METHOD_NOT_IMPLEMENTED`,
    REFRESH_TOKEN_NOT_FOUND: `${prefix}.REFRESH_TOKEN_NOT_FOUND`,
};
exports.AUTHENTICATION_REPOSITORY_ERROR_MESSAGE = {
    REFRESH_TOKEN_NOT_FOUND: "refresh token tidak ditemukan di database",
};
