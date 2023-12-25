"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reply_repository_error_1 = require("../../commons/constants/domains/replies/reply-repository-error");
const reply_repository_1 = require("./reply-repository");
describe("ReplyRepository", () => {
    it("should throw an error if an unimplemented method is called", async () => {
        // @ts-expect-error create an instance of an abstract class
        const replyRepository = new reply_repository_1.ReplyRepository();
        await expect(replyRepository.addReply({})).rejects.toThrow(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(replyRepository.verifyUserIsReplyOwner({})).rejects.toThrow(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(replyRepository.verifyReplyIsExists({})).rejects.toThrow(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(replyRepository.softDeleteReplyById("")).rejects.toThrow(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(replyRepository.getRepliesByCommentId("")).rejects.toThrow(reply_repository_error_1.REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    });
});
