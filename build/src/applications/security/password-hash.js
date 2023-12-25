"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHash = void 0;
const password_hash_error_1 = require("../../commons/constants/applications/security/password-hash-error");
class PasswordHash {
    async hash(plainPassword) {
        throw new Error(password_hash_error_1.PASSWORD_HASH_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyPassword(plainPassword, hashedPassword) {
        throw new Error(password_hash_error_1.PASSWORD_HASH_ERROR.METHOD_NOT_IMPLEMENTED);
    }
}
exports.PasswordHash = PasswordHash;
