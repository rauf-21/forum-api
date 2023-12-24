import { COMMENT_LIKE_REPOSITORY_ERROR } from "../../commons/constants/domains/comment-likes/comment-like-repository-error";
import { CommentOwnerContext } from "../comments/entities/comment-owner-context";
import { CommentLikeRepository } from "./comment-like-repository";

describe("CommentLikeRepository", () => {
  it("should throw an error if an unimplemented method is called", async () => {
    const commentLikeRepository =
      // @ts-expect-error create an instance of an abstract class
      new CommentLikeRepository() as CommentLikeRepository;

    await expect(
      commentLikeRepository.isCommentLiked({} as CommentOwnerContext)
    ).rejects.toThrow(COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(
      commentLikeRepository.likeComment({} as CommentOwnerContext)
    ).rejects.toThrow(COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(
      commentLikeRepository.unlikeComment({} as CommentOwnerContext)
    ).rejects.toThrow(COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(
      commentLikeRepository.getCommentLikeCountByCommentId("")
    ).rejects.toThrow(COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  });
});
