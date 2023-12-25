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
var _AuthenticationRepositoryPostgres_db;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRepositoryPostgres = void 0;
const authentication_repository_error_1 = require("../../commons/constants/domains/authentications/authentication-repository-error");
const authentication_repository_1 = require("../../domains/authentications/authentication-repository");
class AuthenticationRepositoryPostgres extends authentication_repository_1.AuthenticationRepository {
    constructor(db) {
        super();
        _AuthenticationRepositoryPostgres_db.set(this, void 0);
        __classPrivateFieldSet(this, _AuthenticationRepositoryPostgres_db, db, "f");
    }
    async addToken(token) {
        await __classPrivateFieldGet(this, _AuthenticationRepositoryPostgres_db, "f").insertInto("authentications").values({ token }).execute();
    }
    async verifyTokenIsExists(token) {
        const result = await __classPrivateFieldGet(this, _AuthenticationRepositoryPostgres_db, "f")
            .selectFrom("authentications")
            .selectAll()
            .where("token", "=", token)
            .executeTakeFirst();
        if (result === undefined) {
            throw new Error(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.REFRESH_TOKEN_NOT_FOUND);
        }
    }
    async deleteToken(token) {
        await __classPrivateFieldGet(this, _AuthenticationRepositoryPostgres_db, "f")
            .deleteFrom("authentications")
            .where("token", "=", token)
            .execute();
    }
}
exports.AuthenticationRepositoryPostgres = AuthenticationRepositoryPostgres;
_AuthenticationRepositoryPostgres_db = new WeakMap();
