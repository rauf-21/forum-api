import { COMMENT_OWNER_CONTEXT_ERROR } from "../../../commons/constants/domains/comments/comment-owner-context-error";
import { CommentOwnerContext } from "./comment-owner-context";

describe("CommentOwnerContext entities", () => {
  it("should be able to create the commentOwnerContext object correctly", () => {
    const payload = {
      id: "comment-123",
      owner: "user-123",
    };

    const { id, owner } = new CommentOwnerContext(payload);

    expect(id).toEqual(payload.id);
    expect(owner).toEqual(payload.owner);
  });

  it("should an throw error if there is a missing property", () => {
    const payload = {};

    expect(() => new CommentOwnerContext(payload)).toThrow(
      COMMENT_OWNER_CONTEXT_ERROR.MISSING_PROPERTY
    );
  });

  it("should an throw error if there is a property with an invalid data type", () => {
    const payload = {
      id: 123,
    };

    expect(() => new CommentOwnerContext(payload)).toThrow(
      COMMENT_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE
    );
  });
});
