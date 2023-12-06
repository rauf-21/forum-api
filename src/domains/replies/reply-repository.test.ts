import { REPLY_REPOSITORY_ERROR } from "../../commons/constants/domains/replies/reply-repository-error";
import { NewReply } from "./entites/new-reply";
import { ReplyLocatorContext } from "./entites/reply-locator-context";
import { ReplyOwnerContext } from "./entites/reply-owner.context";
import { ReplyRepository } from "./reply-repository";

describe("ReplyRepository", () => {
  it("should throw an error if an unimplemented method is called", async () => {
    // @ts-expect-error create an instance of an abstract class
    const replyRepository = new ReplyRepository() as ReplyRepository;

    await expect(replyRepository.addReply({} as NewReply)).rejects.toThrow(
      REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(
      replyRepository.verifyUserIsReplyOwner({} as ReplyOwnerContext)
    ).rejects.toThrow(REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(
      replyRepository.verifyReplyIsExists({} as ReplyLocatorContext)
    ).rejects.toThrow(REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(replyRepository.softDeleteReplyById("")).rejects.toThrow(
      REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(replyRepository.getRepliesByCommentId("")).rejects.toThrow(
      REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
  });
});
