"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTER_USER_ERROR_MESSAGE = exports.REGISTER_USER_ERROR = void 0;
const prefix = "REGISTER_USER_ERROR";
exports.REGISTER_USER_ERROR = {
    MISSING_PROPERTY: `${prefix}.MISSING_PROPERTY`,
    INVALID_DATA_TYPE: `${prefix}.INVALID_DATA_TYPE`,
    USERNAME_EXCEEDS_THE_CHARACTER_LIMIT: `${prefix}.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT`,
    USERNAME_CONTAINS_A_RESTRICTED_CHARACTER: `${prefix}.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER`,
};
exports.REGISTER_USER_ERROR_MESSAGE = {
    MISSING_PROPERTY: "cannot create a new user because the required property is missing",
    INVALID_DATA_TYPE: "cannot create a new user because the data type does not match",
    USERNAME_EXCEEDS_THE_CHARACTER_LIMIT: "cannot create a new user because the username exceeds the character limit",
    USERNAME_CONTAINS_A_RESTRICTED_CHARACTER: "tidak dapat membuat user baru karena username mengandung karakter terlarang",
};
