"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_like_repository_error_1 = require("../../commons/constants/domains/comment-likes/comment-like-repository-error");
const comment_like_repository_1 = require("./comment-like-repository");
describe("CommentLikeRepository", () => {
    it("should throw an error if an unimplemented method is called", async () => {
        const commentLikeRepository = 
        // @ts-expect-error create an instance of an abstract class
        new comment_like_repository_1.CommentLikeRepository();
        await expect(commentLikeRepository.isCommentLiked({})).rejects.toThrow(comment_like_repository_error_1.COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(commentLikeRepository.likeComment({})).rejects.toThrow(comment_like_repository_error_1.COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(commentLikeRepository.unlikeComment({})).rejects.toThrow(comment_like_repository_error_1.COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(commentLikeRepository.getCommentLikeCountByCommentId("")).rejects.toThrow(comment_like_repository_error_1.COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    });
});
