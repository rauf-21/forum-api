import * as jme from "jest-mock-extended";

import { CommentRepository } from "../../domains/comments/comment-repository";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { AddedReply } from "../../domains/replies/entites/added-reply";
import { NewReply } from "../../domains/replies/entites/new-reply";
import { ReplyRepository } from "../../domains/replies/reply-repository";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { AddReplyUseCase } from "./add-reply-use-case";

describe("AddReplyUseCase", () => {
  it("should orchestrate the add reply action correctly", async () => {
    const useCasePayload = {
      content: "this is a content",
      owner: "user-123",
      threadId: "thread-123",
      commentId: "comment-123",
    };

    const mockReplyRepository = jme.mock<ReplyRepository>();

    mockReplyRepository.addReply.mockResolvedValue(
      new AddedReply({
        id: "reply-123",
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })
    );

    const mockThreadRepository = jme.mock<ThreadRepository>();

    mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);

    const mockCommentRepository = jme.mock<CommentRepository>();

    mockCommentRepository.verifyCommentIsExists.mockResolvedValue(undefined);

    const addReplyUseCase = new AddReplyUseCase({
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const addedReply = await addReplyUseCase.execute(useCasePayload);

    expect(addedReply).toEqual(
      new AddedReply({
        id: "reply-123",
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })
    );
    expect(mockReplyRepository.addReply).toHaveBeenCalledWith(
      new NewReply(useCasePayload)
    );
    expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith(
      new CommentLocatorContext({
        id: useCasePayload.commentId,
        threadId: useCasePayload.threadId,
      })
    );
  });
});
