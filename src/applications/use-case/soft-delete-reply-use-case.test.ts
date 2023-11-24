import * as jme from "jest-mock-extended";

import { ReplyLocatorContext } from "../../domains/replies/entites/reply-locator-context";
import { ReplyOwnerContext } from "../../domains/replies/entites/reply-owner.context";
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

    const mockReplyRepository = jme.mock<ReplyRepository>();

    mockReplyRepository.verifyUserIsReplyOwner.mockResolvedValue(undefined);
    mockReplyRepository.verifyReplyIsExists.mockResolvedValue(undefined);
    mockReplyRepository.softDeleteReplyById.mockResolvedValue(undefined);

    const softDeleteReplyUseCase = new SoftDeleteReplyUseCase({
      replyRepository: mockReplyRepository,
    });

    await softDeleteReplyUseCase.execute(useCasePayload);

    expect(mockReplyRepository.verifyUserIsReplyOwner).toHaveBeenCalledWith(
      new ReplyOwnerContext({
        id: useCasePayload.id,
        owner: useCasePayload.owner,
      })
    );
    expect(mockReplyRepository.verifyReplyIsExists).toHaveBeenCalledWith(
      new ReplyLocatorContext({
        id: useCasePayload.id,
        commentId: useCasePayload.commentId,
      })
    );
    expect(mockReplyRepository.softDeleteReplyById).toHaveBeenCalledWith(
      useCasePayload.id
    );
  });
});
