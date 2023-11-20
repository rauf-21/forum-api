import { ReplyRepository } from "../../domains/replies/reply-repository";
import { SoftDeleteReplyUseCase } from "./soft-delete-reply-use-case";

describe("SoftDeleteReplyUseCase", () => {
  it("should orchestrate the soft delete reply action correctly", async () => {
    const useCasePayload = {
      id: "reply-123",
      owner: "user-123",
      threadId: "thread-123",
      commentId: "comment-123",
    };

    const mockReplyRepository = {
      verifyUserIsReplyOwner: jest.fn().mockResolvedValue(undefined),
      verifyReplyIsExists: jest.fn().mockResolvedValue(undefined),
      softDeleteReplyById: jest.fn().mockResolvedValue(undefined),
    } satisfies Partial<ReplyRepository> as unknown as ReplyRepository;

    const softDeleteReplyUseCase = new SoftDeleteReplyUseCase({
      replyRepository: mockReplyRepository,
    });

    await expect(
      softDeleteReplyUseCase.execute(useCasePayload)
    ).resolves.toEqual(undefined);
  });
});
