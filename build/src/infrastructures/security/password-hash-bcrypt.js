"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PasswordHashBcrypt_bcrypt, _PasswordHashBcrypt_saltRound;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHashBcrypt = void 0;
const password_hash_1 = require("../../applications/security/password-hash");
const password_hash_error_1 = require("../../commons/constants/applications/security/password-hash-error");
class PasswordHashBcrypt extends password_hash_1.PasswordHash {
    constructor(bcrypt, saltRound = 10) {
        super();
        _PasswordHashBcrypt_bcrypt.set(this, void 0);
        _PasswordHashBcrypt_saltRound.set(this, void 0);
        __classPrivateFieldSet(this, _PasswordHashBcrypt_bcrypt, bcrypt, "f");
        __classPrivateFieldSet(this, _PasswordHashBcrypt_saltRound, saltRound, "f");
    }
    async hash(plainPassword) {
        const hashedPassword = await __classPrivateFieldGet(this, _PasswordHashBcrypt_bcrypt, "f").hash(plainPassword, __classPrivateFieldGet(this, _PasswordHashBcrypt_saltRound, "f"));
        return hashedPassword;
    }
    async verifyPassword(plainPassword, hashedPassword) {
        const result = await __classPrivateFieldGet(this, _PasswordHashBcrypt_bcrypt, "f").compare(plainPassword, hashedPassword);
        if (!result) {
            throw new Error(password_hash_error_1.PASSWORD_HASH_ERROR.INCORRECT_CREDENTIALS);
        }
    }
}
exports.PasswordHashBcrypt = PasswordHashBcrypt;
_PasswordHashBcrypt_bcrypt = new WeakMap(), _PasswordHashBcrypt_saltRound = new WeakMap();
