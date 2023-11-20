import { COMMENT_LOCATOR_CONTEXT_ERROR } from "../../../commons/constants/domains/comments/comment-locator-context-error";
import { CommentLocatorContext } from "./comment-locator-context";

describe("CommentLocatorContext entities", () => {
  it("should be able to create the commentLocatorContext object correctly", () => {
    const payload = {
      id: "comment-123",
      threadId: "thread-123",
    };

    const { id, threadId } = new CommentLocatorContext(payload);

    expect(id).toEqual(payload.id);
    expect(threadId).toEqual(payload.threadId);
  });

  it("should throw an error if there is a missing property", () => {
    const payload = {};

    expect(() => new CommentLocatorContext(payload)).toThrow(
      COMMENT_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", () => {
    const payload = {
      id: 123,
    };

    expect(() => new CommentLocatorContext(payload)).toThrow(
      COMMENT_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE
    );
  });
});
