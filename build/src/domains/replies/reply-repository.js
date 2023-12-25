"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyRepository = void 0;
const reply_repository_error_1 = require("../../commons/constants/domains/replies/reply-repository-error");
class ReplyRepository {
    async addReply(newReply) {
        throw new Error(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyUserIsReplyOwner(replyOwnerContext) {
        throw new Error(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyReplyIsExists(replyLocatorContext) {
        throw new Error(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async softDeleteReplyById(id) {
        throw new Error(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async getRepliesByCommentId(commentId) {
        throw new Error(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
}
exports.ReplyRepository = ReplyRepository;
