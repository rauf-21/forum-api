import { REPLY_LOCATOR_CONTEXT_ERROR } from "../../../commons/constants/domains/replies/reply-locator-context-error";
import { ReplyLocatorContext } from "./reply-locator-context";

describe("ReplyLocatorContext entities", () => {
  it("should be able to create the replyLocatorContext object correctly", () => {
    const payload = {
      id: "reply-123",
      commentId: "comment-123",
    };

    const { id, commentId } = new ReplyLocatorContext(payload);

    expect(id).toEqual(payload.id);
    expect(commentId).toEqual(payload.commentId);
  });

  it("should throw an error if there is a missing property", () => {
    const payload = {};

    expect(() => new ReplyLocatorContext(payload)).toThrow(
      REPLY_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", () => {
    const payload = {
      id: 123,
    };

    expect(() => new ReplyLocatorContext(payload)).toThrow(
      REPLY_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE
    );
  });
});
