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
var _CommentLikeRepositoryPostgres_db, _CommentLikeRepositoryPostgres_idGenerator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLikeRepositoryPostgres = void 0;
const comment_like_repository_1 = require("../../domains/comment-likes/comment-like-repository");
class CommentLikeRepositoryPostgres extends comment_like_repository_1.CommentLikeRepository {
    constructor(db, idGenerator) {
        super();
        _CommentLikeRepositoryPostgres_db.set(this, void 0);
        _CommentLikeRepositoryPostgres_idGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _CommentLikeRepositoryPostgres_db, db, "f");
        __classPrivateFieldSet(this, _CommentLikeRepositoryPostgres_idGenerator, idGenerator, "f");
    }
    async isCommentLiked(commentOwnerContext) {
        const { id: commentId, owner } = commentOwnerContext;
        const result = await __classPrivateFieldGet(this, _CommentLikeRepositoryPostgres_db, "f")
            .selectFrom("commentLikes")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ eb, and }) => and([eb("commentId", "=", commentId), eb("owner", "=", owner)]))
            .limit(1)
            .executeTakeFirst();
        return result !== undefined;
    }
    async likeComment(commentOwnerContext) {
        const { id: commentId, owner } = commentOwnerContext;
        const id = `comment-like-${__classPrivateFieldGet(this, _CommentLikeRepositoryPostgres_idGenerator, "f").call(this)}`;
        await __classPrivateFieldGet(this, _CommentLikeRepositoryPostgres_db, "f")
            .insertInto("commentLikes")
            .values({
            id,
            commentId,
            owner,
        })
            .execute();
    }
    async unlikeComment(commentOwnerContext) {
        const { id: commentId, owner } = commentOwnerContext;
        await __classPrivateFieldGet(this, _CommentLikeRepositoryPostgres_db, "f")
            .deleteFrom("commentLikes")
            .where(({ eb, and }) => and([eb("commentId", "=", commentId), eb("owner", "=", owner)]))
            .execute();
    }
    async getCommentLikeCountByCommentId(commentId) {
        const result = await __classPrivateFieldGet(this, _CommentLikeRepositoryPostgres_db, "f")
            .selectFrom("commentLikes")
            .select(({ fn }) => fn.count("id").as("commentLikeCount"))
            .where("commentId", "=", commentId)
            .executeTakeFirst();
        // The query above is guaranteed to always return a value,
        // even if the commentId is not found.
        // This branch is just a countermeasure.
        // istanbul ignore if
        if (result === undefined) {
            throw new Error("something went wrong");
        }
        return parseInt(result.commentLikeCount, 10);
    }
}
exports.CommentLikeRepositoryPostgres = CommentLikeRepositoryPostgres;
_CommentLikeRepositoryPostgres_db = new WeakMap(), _CommentLikeRepositoryPostgres_idGenerator = new WeakMap();
