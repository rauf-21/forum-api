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
var _UserRepositoryPostgres_db, _UserRepositoryPostgres_idGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryPostgres = void 0;
const user_repository_error_1 = require("../../commons/constants/domains/users/user-repository-error");
const registered_user_1 = require("../../domains/users/entities/registered-user");
const user_repository_1 = require("../../domains/users/user-repository");
class UserRepositoryPostgres extends user_repository_1.UserRepository {
    constructor(db, idGenerator) {
        super();
        _UserRepositoryPostgres_db.set(this, void 0);
        _UserRepositoryPostgres_idGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _UserRepositoryPostgres_db, db, "f");
        __classPrivateFieldSet(this, _UserRepositoryPostgres_idGenerator, idGenerator, "f");
    }
    async verifyUsernameIsAvailable(username) {
        const result = await __classPrivateFieldGet(this, _UserRepositoryPostgres_db, "f")
            .selectFrom("users")
            .select("username")
            .where("username", "=", username)
            .executeTakeFirst();
        if (result !== undefined) {
            throw new Error(user_repository_error_1.USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND);
        }
    }
    async addUser(registerUser) {
        const { username, password, fullname } = registerUser;
        const id = `user-${__classPrivateFieldGet(this, _UserRepositoryPostgres_idGenerator, "f").call(this)}`;
        const result = await __classPrivateFieldGet(this, _UserRepositoryPostgres_db, "f")
            .insertInto("users")
            .values({ id, username, password, fullname })
            .returning(["id", "username", "fullname"])
            .executeTakeFirst();
        return new registered_user_1.RegisteredUser(result);
    }
    async getUserByUsername(username) {
        const user = await __classPrivateFieldGet(this, _UserRepositoryPostgres_db, "f")
            .selectFrom("users")
            .selectAll()
            .where("username", "=", username)
            .executeTakeFirst();
        if (user === undefined) {
            throw new Error(user_repository_error_1.USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND);
        }
        return user;
    }
    async getUsernameById(id) {
        const result = await __classPrivateFieldGet(this, _UserRepositoryPostgres_db, "f")
            .selectFrom("users")
            .select(["username"])
            .where("id", "=", id)
            .executeTakeFirst();
        if (!result) {
            throw new Error(user_repository_error_1.USER_REPOSITORY_ERROR.USER_NOT_FOUND);
        }
        return result.username;
    }
}
exports.UserRepositoryPostgres = UserRepositoryPostgres;
_UserRepositoryPostgres_db = new WeakMap(), _UserRepositoryPostgres_idGenerator = new WeakMap();
