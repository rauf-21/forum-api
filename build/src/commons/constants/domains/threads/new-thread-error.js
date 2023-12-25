"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEW_THREAD_ERROR_MESSAGE = exports.NEW_THREAD_ERROR = void 0;
const prefix = "NEW_THREAD_ERROR";
exports.NEW_THREAD_ERROR = {
    MISSING_PROPERTY: `${prefix}.MISSING_PROPERTIES`,
    INVALID_DATA_TYPE: `${prefix}.INVALID_DATA_TYPE`,
};
exports.NEW_THREAD_ERROR_MESSAGE = {
    MISSING_PROPERTY: "must send a title and body",
    INVALID_DATA_TYPE: "the title and body must be a type of string",
};
