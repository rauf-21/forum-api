"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_REPOSITORY_ERROR_MESSAGE = exports.USER_REPOSITORY_ERROR = void 0;
const prefix = "USER_REPOSITORY_ERROR";
exports.USER_REPOSITORY_ERROR = {
    METHOD_NOT_IMPLEMENTED: `${prefix}.METHOD_NOT_IMPLEMENTED`,
    USERNAME_NOT_FOUND: `${prefix}.USERNAME_NOT_FOUND`,
    USER_NOT_FOUND: `${prefix}.USER_NOT_FOUND`,
};
exports.USER_REPOSITORY_ERROR_MESSAGE = {
    USERNAME_NOT_FOUND: "username tidak tersedia",
    USER_NOT_FOUND: "the user is not found",
};
