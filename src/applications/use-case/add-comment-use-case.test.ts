import { CommentRepository } from "../../domains/comments/comment-repository";
import { AddedComment } from "../../domains/comments/entities/added-comment";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { AddCommentUseCase } from "./add-comment-use-case";

describe("AddCommentUseCase", () => {
  it("should orchestrate the add comment action correctly", async () => {
    const useCasePayload = {
      content: "this is a content",
      owner: "user-123",
      threadId: "thread-123",
    };

    const mockAddedComment = new AddedComment({
      id: "comment-123",
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });

    const mockCommentRepository = {
      addComment: jest.fn().mockResolvedValue(mockAddedComment),
    } satisfies Partial<CommentRepository> as unknown as CommentRepository;

    const mockThreadRepository = {
      verifyThreadIsExists: jest.fn().mockResolvedValue(undefined),
    } satisfies Partial<ThreadRepository> as unknown as ThreadRepository;

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addedComment = await addCommentUseCase.execute(useCasePayload);

    expect(addedComment).toEqual(mockAddedComment);
    expect(mockCommentRepository.addComment).toHaveBeenCalledWith(
      useCasePayload
    );
    expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(
      useCasePayload.threadId
    );
  });
});
