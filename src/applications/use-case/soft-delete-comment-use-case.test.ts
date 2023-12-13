import * as jme from "jest-mock-extended";

import { CommentRepository } from "../../domains/comments/comment-repository";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { CommentOwnerContext } from "../../domains/comments/entities/comment-owner-context";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { SoftDeleteCommentUseCase } from "./soft-delete-comment-use-case";

describe("SoftDeleteCommentUseCase", () => {
  it("should orchestrate the soft delete comment action correctly", async () => {
    const useCasePayload = {
      id: "comment-123",
      owner: "user-123",
      threadId: "user-123",
    };

    const mockThreadRepository = jme.mock<ThreadRepository>();

    mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);

    const mockCommentRepository = jme.mock<CommentRepository>();

    mockCommentRepository.verifyUserIsCommentOwner.mockResolvedValue(undefined);
    mockCommentRepository.verifyCommentIsExists.mockResolvedValue(undefined);
    mockCommentRepository.softDeleteCommentById.mockResolvedValue(undefined);

    const softDeleteCommentUseCase = new SoftDeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    await softDeleteCommentUseCase.execute(useCasePayload);

    expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith(
      new CommentLocatorContext({
        id: useCasePayload.id,
        threadId: useCasePayload.threadId,
      })
    );
    expect(mockCommentRepository.verifyUserIsCommentOwner).toHaveBeenCalledWith(
      new CommentOwnerContext({
        id: useCasePayload.id,
        owner: useCasePayload.owner,
      })
    );
    expect(mockCommentRepository.softDeleteCommentById).toHaveBeenCalledWith(
      useCasePayload.id
    );
  });
});
