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
var _ThreadRepositoryPostgres_db, _ThreadRepositoryPostgres_idGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadRepositoryPostgres = void 0;
const thread_repository_error_1 = require("../../commons/constants/domains/threads/thread-repository-error");
const added_thread_1 = require("../../domains/threads/entities/added-thread");
const thread_repository_1 = require("../../domains/threads/thread-repository");
class ThreadRepositoryPostgres extends thread_repository_1.ThreadRepository {
    constructor(db, idGenerator) {
        super();
        _ThreadRepositoryPostgres_db.set(this, void 0);
        _ThreadRepositoryPostgres_idGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _ThreadRepositoryPostgres_db, db, "f");
        __classPrivateFieldSet(this, _ThreadRepositoryPostgres_idGenerator, idGenerator, "f");
    }
    async addThread(newThread) {
        const { title, body, owner } = newThread;
        const id = `thread-${__classPrivateFieldGet(this, _ThreadRepositoryPostgres_idGenerator, "f").call(this)}`;
        const result = await __classPrivateFieldGet(this, _ThreadRepositoryPostgres_db, "f")
            .insertInto("threads")
            .values({ id, title, body, owner })
            .returning(["id", "title", "owner"])
            .executeTakeFirst();
        return new added_thread_1.AddedThread(result);
    }
    async verifyThreadIsExists(id) {
        const result = await __classPrivateFieldGet(this, _ThreadRepositoryPostgres_db, "f")
            .selectNoFrom(({ exists, selectFrom }) => exists(selectFrom("threads")
            .select(({ lit }) => lit(1).as("one"))
            .where("id", "=", id)).as("isThreadExists"))
            .executeTakeFirst();
        if (!result || !result.isThreadExists) {
            throw new Error(thread_repository_error_1.THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
        }
    }
    async getThreadById(id) {
        const thread = await __classPrivateFieldGet(this, _ThreadRepositoryPostgres_db, "f")
            .selectFrom("threads")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst();
        if (!thread) {
            throw new Error(thread_repository_error_1.THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
        }
        return thread;
    }
}
exports.ThreadRepositoryPostgres = ThreadRepositoryPostgres;
_ThreadRepositoryPostgres_db = new WeakMap(), _ThreadRepositoryPostgres_idGenerator = new WeakMap();
