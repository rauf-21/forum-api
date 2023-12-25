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
var _ReplyRepositoryPostgres_db, _ReplyRepositoryPostgres_idGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyRepositoryPostgres = void 0;
const reply_repository_error_1 = require("../../commons/constants/domains/replies/reply-repository-error");
const added_reply_1 = require("../../domains/replies/entites/added-reply");
const reply_repository_1 = require("../../domains/replies/reply-repository");
class ReplyRepositoryPostgres extends reply_repository_1.ReplyRepository {
    constructor(db, idGenerator) {
        super();
        _ReplyRepositoryPostgres_db.set(this, void 0);
        _ReplyRepositoryPostgres_idGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _ReplyRepositoryPostgres_db, db, "f");
        __classPrivateFieldSet(this, _ReplyRepositoryPostgres_idGenerator, idGenerator, "f");
    }
    async addReply(newReply) {
        const { content, owner, commentId } = newReply;
        const id = `reply-${__classPrivateFieldGet(this, _ReplyRepositoryPostgres_idGenerator, "f").call(this)}`;
        const addedReply = await __classPrivateFieldGet(this, _ReplyRepositoryPostgres_db, "f")
            .insertInto("replies")
            .values({ id, content, owner, commentId })
            .returning(["id", "content", "owner"])
            .executeTakeFirst();
        return new added_reply_1.AddedReply(addedReply);
    }
    async verifyUserIsReplyOwner(replyOwnerContext) {
        const { id, owner } = replyOwnerContext;
        const result = await __classPrivateFieldGet(this, _ReplyRepositoryPostgres_db, "f")
            .selectNoFrom(({ exists, selectFrom }) => exists(selectFrom("replies")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ and, eb }) => and([eb("id", "=", id), eb("owner", "=", owner)]))).as("isUserReplyOwner"))
            .executeTakeFirst();
        if (!result || !result.isUserReplyOwner) {
            throw new Error(reply_repository_error_1.REPLY_REPOSITORY_ERROR.UNAUTHORIZED_REPLY_DELETION);
        }
    }
    async verifyReplyIsExists(replyLocatorContext) {
        const { id, commentId } = replyLocatorContext;
        const result = await __classPrivateFieldGet(this, _ReplyRepositoryPostgres_db, "f")
            .selectNoFrom(({ exists, selectFrom }) => exists(selectFrom("replies")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ and, eb }) => and([eb("id", "=", id), eb("commentId", "=", commentId)]))).as("isReplyExists"))
            .executeTakeFirst();
        if (!result || !result.isReplyExists) {
            throw new Error(reply_repository_error_1.REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND);
        }
    }
    async softDeleteReplyById(id) {
        await __classPrivateFieldGet(this, _ReplyRepositoryPostgres_db, "f")
            .updateTable("replies")
            .set({ isDeleted: true })
            .where("id", "=", id)
            .execute();
    }
    async getRepliesByCommentId(commentId) {
        const replies = await __classPrivateFieldGet(this, _ReplyRepositoryPostgres_db, "f")
            .selectFrom("replies")
            .selectAll()
            .where("commentId", "=", commentId)
            .orderBy("date asc")
            .execute();
        return replies;
    }
}
exports.ReplyRepositoryPostgres = ReplyRepositoryPostgres;
_ReplyRepositoryPostgres_db = new WeakMap(), _ReplyRepositoryPostgres_idGenerator = new WeakMap();
