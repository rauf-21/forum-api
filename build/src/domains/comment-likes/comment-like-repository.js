"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLikeRepository = void 0;
const comment_like_repository_error_1 = require("../../commons/constants/domains/comment-likes/comment-like-repository-error");
class CommentLikeRepository {
    async isCommentLiked(commentOwnerContext) {
        throw new Error(comment_like_repository_error_1.COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async likeComment(commentOwnerContext) {
        throw new Error(comment_like_repository_error_1.COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async unlikeComment(commentOwnerContext) {
        throw new Error(comment_like_repository_error_1.COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async getCommentLikeCountByCommentId(commentId) {
        throw new Error(comment_like_repository_error_1.COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
}
exports.CommentLikeRepository = CommentLikeRepository;
