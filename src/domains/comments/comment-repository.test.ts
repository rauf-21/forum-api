import { COMMENT_REPOSITORY_ERROR } from "../../commons/constants/domains/comments/comment-repository-error";
import { CommentRepository } from "./comment-repository";
import { CommentLocatorContext } from "./entities/comment-locator-context";
import { CommentOwnerContext } from "./entities/comment-owner-context";
import { NewComment } from "./entities/new-comment";

describe("CommentRepository", () => {
  it("should throw an error if an unimplemented method is called", async () => {
    // @ts-expect-error create an instance of an abstract class
    const commentRepository = new CommentRepository() as CommentRepository;

    await expect(
      commentRepository.addComment({} as NewComment)
    ).rejects.toThrow(COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(
      commentRepository.verifyUserIsCommentOwner({} as CommentOwnerContext)
    ).rejects.toThrow(COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(
      commentRepository.verifyCommentIsExists({} as CommentLocatorContext)
    ).rejects.toThrow(COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(commentRepository.softDeleteCommentById("")).rejects.toThrow(
      COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(commentRepository.getCommentsByThreadId("")).rejects.toThrow(
      COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
  });
});
