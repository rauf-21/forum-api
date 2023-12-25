"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_repository_error_1 = require("../../commons/constants/domains/comments/comment-repository-error");
const comment_repository_1 = require("./comment-repository");
describe("CommentRepository", () => {
    it("should throw an error if an unimplemented method is called", async () => {
        // @ts-expect-error create an instance of an abstract class
        const commentRepository = new comment_repository_1.CommentRepository();
        await expect(commentRepository.addComment({})).rejects.toThrow(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(commentRepository.verifyUserIsCommentOwner({})).rejects.toThrow(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(commentRepository.verifyCommentIsExists({})).rejects.toThrow(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(commentRepository.softDeleteCommentById("")).rejects.toThrow(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(commentRepository.getCommentsByThreadId("")).rejects.toThrow(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    });
});
