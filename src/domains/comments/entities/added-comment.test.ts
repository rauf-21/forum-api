import { ADDED_COMMENT_ERROR } from "../../../commons/constants/domains/comments/added-comment-error";
import { AddedComment } from "./added-comment";

describe("AddedComment entities", () => {
  it("should be able to create the addedComment object correctly", () => {
    const payload = {
      id: "comment-123",
      content: "this is a content",
      owner: "user-123",
    };

    const { id, content, owner } = new AddedComment(payload);

    expect(id).toEqual(payload.id);
    expect(content).toEqual(content);
    expect(owner).toEqual(owner);
  });

  it("should throw an error if there is a missing property", () => {
    const payload = {};

    expect(() => new AddedComment(payload)).toThrow(
      ADDED_COMMENT_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", () => {
    const payload = {
      id: 123,
    };

    expect(() => new AddedComment(payload)).toThrow(
      ADDED_COMMENT_ERROR.INVALID_DATA_TYPE
    );
  });
});
