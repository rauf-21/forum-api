import * as jme from "jest-mock-extended";

import { CommentLikeRepository } from "../../domains/comment-likes/comment-like-repository";
import { CommentRepository } from "../../domains/comments/comment-repository";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { CommentOwnerContext } from "../../domains/comments/entities/comment-owner-context";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { ToggleCommentLikeUseCase } from "./toggle-comment-like-use-case";

describe("ToggleCommentLikeUseCase", () => {
  it("should orchestrate the toggle comment like action correctly", async () => {
    const useCasePayload = {
      id: "comment-123",
      threadId: "thread-123",
      owner: "user-123",
    };

    const mockThreadRepository = jme.mock<ThreadRepository>();

    mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);

    const mockCommentRepository = jme.mock<CommentRepository>();

    mockCommentRepository.verifyCommentIsExists.mockResolvedValue(undefined);

    const mockCommentLikeRepository = jme.mock<CommentLikeRepository>();

    mockCommentLikeRepository.isCommentLiked
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    mockCommentLikeRepository.likeComment.mockResolvedValue(undefined);
    mockCommentLikeRepository.unlikeComment.mockResolvedValue(undefined);

    const toggleCommentLikeUseCase = new ToggleCommentLikeUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      commentLikeRepository: mockCommentLikeRepository,
    });

    await toggleCommentLikeUseCase.execute(useCasePayload);

    const expectedCommentOwnerContext = new CommentOwnerContext({
      id: useCasePayload.id,
      owner: useCasePayload.owner,
    });

    expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith(
      new CommentLocatorContext({
        id: useCasePayload.id,
        threadId: useCasePayload.threadId,
      })
    );
    expect(mockCommentLikeRepository.isCommentLiked).toHaveBeenCalledWith(
      expectedCommentOwnerContext
    );
    expect(mockCommentLikeRepository.likeComment).toHaveBeenCalledWith(
      expectedCommentOwnerContext
    );

    await toggleCommentLikeUseCase.execute(useCasePayload);

    expect(mockCommentLikeRepository.unlikeComment).toHaveBeenCalledWith(
      expectedCommentOwnerContext
    );
  });
});
