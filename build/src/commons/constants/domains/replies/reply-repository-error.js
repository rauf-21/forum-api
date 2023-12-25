"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REPLY_REPOSITORY_ERROR_MESSAGE = exports.REPLY_REPOSITORY_ERROR = void 0;
const prefix = "REPLY_REPOSITORY_ERROR";
exports.REPLY_REPOSITORY_ERROR = {
    METHOD_NOT_IMPLEMENTED: `${prefix}.METHOD_NOT_IMPLEMENTED`,
    UNAUTHORIZED_REPLY_DELETION: `${prefix}.UNAUTHORIZED_REPLY_DELETION`,
    REPLY_NOT_FOUND: `${prefix}.REPLY_NOT_FOUND`,
};
exports.REPLY_REPOSITORY_ERROR_MESSAGE = {
    UNAUTHORIZED_REPLY_DELETION: "you do not have the necessary permissions to delete this reply",
    REPLY_NOT_FOUND: "the reply is not found",
};
