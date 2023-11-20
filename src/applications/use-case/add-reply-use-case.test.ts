import { CommentRepository } from "../../domains/comments/comment-repository";
import { AddedReply } from "../../domains/replies/entites/added-reply";
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

    const mockAddedReply = new AddedReply({
      id: "reply-123",
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });

    const mockReplyRepository = {
      addReply: jest.fn().mockResolvedValue(mockAddedReply),
    } satisfies Partial<ReplyRepository> as unknown as ReplyRepository;

    const mockThreadRepository = {
      verifyThreadIsExists: jest.fn().mockResolvedValue(undefined),
    } satisfies Partial<ThreadRepository> as unknown as ThreadRepository;

    const mockCommentRepository = {
      verifyCommentIsExists: jest.fn().mockResolvedValue(undefined),
    } satisfies Partial<CommentRepository> as unknown as CommentRepository;

    const addReplyUseCase = new AddReplyUseCase({
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const addedReply = await addReplyUseCase.execute(useCasePayload);

    expect(addedReply).toEqual(mockAddedReply);
    expect(mockReplyRepository.addReply).toHaveBeenCalledWith(useCasePayload);
    expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith({
      id: useCasePayload.commentId,
      threadId: useCasePayload.threadId,
    });
  });
});
