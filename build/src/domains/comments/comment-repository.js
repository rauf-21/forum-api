"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const comment_repository_error_1 = require("../../commons/constants/domains/comments/comment-repository-error");
class CommentRepository {
    async addComment(newComment) {
        throw new Error(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyUserIsCommentOwner(commentOwnerContext) {
        throw new Error(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyCommentIsExists(commentLocatorContext) {
        throw new Error(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async softDeleteCommentById(id) {
        throw new Error(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async getCommentsByThreadId(threadId) {
        throw new Error(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
}
exports.CommentRepository = CommentRepository;
