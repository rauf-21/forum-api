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
var _CommentRepositoryPostgres_db, _CommentRepositoryPostgres_idGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepositoryPostgres = void 0;
const comment_repository_error_1 = require("../../commons/constants/domains/comments/comment-repository-error");
const comment_repository_1 = require("../../domains/comments/comment-repository");
const added_comment_1 = require("../../domains/comments/entities/added-comment");
class CommentRepositoryPostgres extends comment_repository_1.CommentRepository {
    constructor(db, idGenerator) {
        super();
        _CommentRepositoryPostgres_db.set(this, void 0);
        _CommentRepositoryPostgres_idGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _CommentRepositoryPostgres_db, db, "f");
        __classPrivateFieldSet(this, _CommentRepositoryPostgres_idGenerator, idGenerator, "f");
    }
    async addComment(newComment) {
        const { content, owner, threadId } = newComment;
        const id = `comment-${__classPrivateFieldGet(this, _CommentRepositoryPostgres_idGenerator, "f").call(this)}`;
        const addedComment = await __classPrivateFieldGet(this, _CommentRepositoryPostgres_db, "f")
            .insertInto("comments")
            .values({ id, content, owner, threadId })
            .returning(["id", "content", "owner"])
            .executeTakeFirst();
        return new added_comment_1.AddedComment(addedComment);
    }
    async verifyUserIsCommentOwner(commentOwnerContext) {
        const { id, owner } = commentOwnerContext;
        const result = await __classPrivateFieldGet(this, _CommentRepositoryPostgres_db, "f")
            .selectNoFrom(({ exists, selectFrom }) => exists(selectFrom("comments")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ and, eb }) => and([eb("id", "=", id), eb("owner", "=", owner)]))).as("isUserTheCommentOwner"))
            .executeTakeFirst();
        if (!result || !result.isUserTheCommentOwner) {
            throw new Error(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.UNAUTHORIZED_COMMENT_DELETION);
        }
    }
    async verifyCommentIsExists(commentLocatorContext) {
        const { id, threadId } = commentLocatorContext;
        const result = await __classPrivateFieldGet(this, _CommentRepositoryPostgres_db, "f")
            .selectNoFrom(({ exists, selectFrom }) => exists(selectFrom("comments")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ and, eb }) => and([eb("id", "=", id), eb("threadId", "=", threadId)]))).as("isCommentExists"))
            .executeTakeFirst();
        if (!result || !result.isCommentExists) {
            throw new Error(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.COMMENT_NOT_FOUND);
        }
    }
    async softDeleteCommentById(id) {
        await __classPrivateFieldGet(this, _CommentRepositoryPostgres_db, "f")
            .updateTable("comments")
            .set({ isDeleted: true })
            .where("id", "=", id)
            .execute();
    }
    async getCommentsByThreadId(threadId) {
        const comments = await __classPrivateFieldGet(this, _CommentRepositoryPostgres_db, "f")
            .selectFrom("comments")
            .selectAll()
            .where("threadId", "=", threadId)
            .orderBy("date asc")
            .execute();
        return comments;
    }
}
exports.CommentRepositoryPostgres = CommentRepositoryPostgres;
_CommentRepositoryPostgres_db = new WeakMap(), _CommentRepositoryPostgres_idGenerator = new WeakMap();
