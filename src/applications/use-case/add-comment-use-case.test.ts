import * as jme from "jest-mock-extended";

import { CommentRepository } from "../../domains/comments/comment-repository";
import { AddedComment } from "../../domains/comments/entities/added-comment";
import { NewComment } from "../../domains/comments/entities/new-comment";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { AddCommentUseCase } from "./add-comment-use-case";

describe("AddCommentUseCase", () => {
  it("should orchestrate the add comment action correctly", async () => {
    const useCasePayload = {
      content: "this is a content",
      owner: "user-123",
      threadId: "thread-123",
    };

    const mockCommentRepository = jme.mock<CommentRepository>();

    mockCommentRepository.addComment.mockResolvedValue(
      new AddedComment({
        id: "comment-123",
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })
    );

    const mockThreadRepository = jme.mock<ThreadRepository>();

    mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addedComment = await addCommentUseCase.execute(useCasePayload);

    expect(addedComment).toEqual(
      new AddedComment({
        id: "comment-123",
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })
    );
    expect(mockCommentRepository.addComment).toHaveBeenCalledWith(
      new NewComment(useCasePayload)
    );
    expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(
      useCasePayload.threadId
    );
  });
});
