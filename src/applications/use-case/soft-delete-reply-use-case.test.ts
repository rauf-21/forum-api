import * as jme from "jest-mock-extended";

import { SOFT_DELETE_REPLY_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/soft-delete-reply-use-case-error";
import { CommentRepository } from "../../domains/comments/comment-repository";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { ReplyLocatorContext } from "../../domains/replies/entites/reply-locator-context";
import { ReplyOwnerContext } from "../../domains/replies/entites/reply-owner.context";
import { ReplyRepository } from "../../domains/replies/reply-repository";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import {
  SoftDeleteReplyUseCase,
  SoftDeleteReplyUseCaseDependencies,
} from "./soft-delete-reply-use-case";

describe("SoftDeleteReplyUseCase", () => {
  it("should orchestrate the soft delete reply action correctly", async () => {
    const useCasePayload = {
      id: "reply-123",
      owner: "user-123",
      threadId: "thread-123",
      commentId: "comment-123",
    };

    const mockThreadRepository = jme.mock<ThreadRepository>();

    mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);

    const mockCommentRepository = jme.mock<CommentRepository>();

    mockCommentRepository.verifyCommentIsExists.mockResolvedValue(undefined);

    const mockReplyRepository = jme.mock<ReplyRepository>();

    mockReplyRepository.verifyUserIsReplyOwner.mockResolvedValue(undefined);
    mockReplyRepository.verifyReplyIsExists.mockResolvedValue(undefined);
    mockReplyRepository.softDeleteReplyById.mockResolvedValue(undefined);

    const softDeleteReplyUseCase = new SoftDeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    await softDeleteReplyUseCase.execute(useCasePayload);

    expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith(
      new CommentLocatorContext({
        id: useCasePayload.commentId,
        threadId: useCasePayload.threadId,
      })
    );
    expect(mockReplyRepository.verifyReplyIsExists).toHaveBeenCalledWith(
      new ReplyLocatorContext({
        id: useCasePayload.id,
        commentId: useCasePayload.commentId,
      })
    );
    expect(mockReplyRepository.verifyUserIsReplyOwner).toHaveBeenCalledWith(
      new ReplyOwnerContext({
        id: useCasePayload.id,
        owner: useCasePayload.owner,
      })
    );
    expect(mockReplyRepository.softDeleteReplyById).toHaveBeenCalledWith(
      useCasePayload.id
    );
  });

  it("should throw an error if there is a missing property", async () => {
    const softDeleteReplyUseCase = new SoftDeleteReplyUseCase(
      {} satisfies Partial<SoftDeleteReplyUseCaseDependencies> as SoftDeleteReplyUseCaseDependencies
    );

    await expect(softDeleteReplyUseCase.execute({})).rejects.toThrow(
      SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", async () => {
    const softDeleteReplyUseCase = new SoftDeleteReplyUseCase(
      {} satisfies Partial<SoftDeleteReplyUseCaseDependencies> as SoftDeleteReplyUseCaseDependencies
    );

    await expect(softDeleteReplyUseCase.execute({ id: 123 })).rejects.toThrow(
      SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE
    );
  });
});
