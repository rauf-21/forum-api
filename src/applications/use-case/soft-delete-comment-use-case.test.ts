import { CommentRepository } from "../../domains/comments/comment-repository";
import { SoftDeleteCommentUseCase } from "./soft-delete-comment-use-case";

describe("SoftDeleteCommentUseCase", () => {
  it("should orchestrate the soft delete comment action correctly", async () => {
    const useCasePayload = {
      id: "comment-123",
      owner: "user-123",
      threadId: "user-123",
    };

    const mockCommentUserRepository = {
      verifyUserIsCommentOwner: jest.fn().mockResolvedValue(undefined),
      verifyCommentIsExists: jest.fn().mockResolvedValue(undefined),
      softDeleteCommentById: jest.fn().mockResolvedValue(undefined),
    } satisfies Partial<CommentRepository> as unknown as CommentRepository;

    const softDeleteCommentUseCase = new SoftDeleteCommentUseCase({
      commentRepository: mockCommentUserRepository,
    });

    await expect(
      softDeleteCommentUseCase.execute(useCasePayload)
    ).resolves.toEqual(undefined);
  });
});
