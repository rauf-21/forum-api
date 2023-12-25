"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEW_REPLY_ERROR_MESSAGE = exports.NEW_REPLY_ERROR = void 0;
const prefix = "NEW_REPLY_ERROR";
exports.NEW_REPLY_ERROR = {
    MISSING_PROPERTY: `${prefix}.MISSING_PROPERTY`,
    INVALID_DATA_TYPE: `${prefix}.INVALID_DATA_TYPE`,
};
exports.NEW_REPLY_ERROR_MESSAGE = {
    MISSING_PROPERTY: "must send a content",
    INVALID_DATA_TYPE: "the content must be a type of string",
};
