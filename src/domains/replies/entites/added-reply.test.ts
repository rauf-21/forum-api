import { ADDED_REPLY_ERROR } from "../../../commons/constants/domains/replies/added-reply-error";
import { AddedReply } from "./added-reply";

describe("AddedReply entities", () => {
  it("should be able to create the addedReply object correctly", () => {
    const payload = {
      id: "reply-123",
      content: "this is a content",
      owner: "user-123",
    };

    const { id, content, owner } = new AddedReply(payload);

    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });

  it("should throw an error if there is a missing property", () => {
    const payload = {};

    expect(() => new AddedReply(payload)).toThrow(
      ADDED_REPLY_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", () => {
    const payload = {
      id: 123,
    };

    expect(() => new AddedReply(payload)).toThrow(
      ADDED_REPLY_ERROR.INVALID_DATA_TYPE
    );
  });
});
