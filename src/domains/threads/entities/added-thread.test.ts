import { ADDED_THREAD_ERROR } from "../../../commons/constants/domains/threads/added-thread-error";
import { AddedThread } from "./added-thread";

describe("AddedThread entitites", () => {
  it("should be able to create the addedThread object correctly", () => {
    const payload = {
      id: "thread-123",
      title: "this is a thread",
      owner: "user-123",
    };

    const { id, title, owner } = new AddedThread(payload);

    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.owner);
  });

  it("should throw an error if there is a missing property", () => {
    const payload = {};

    expect(() => new AddedThread(payload)).toThrow(
      ADDED_THREAD_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", () => {
    const payload = {
      id: 123,
    };

    expect(() => new AddedThread(payload)).toThrow(
      ADDED_THREAD_ERROR.INVALID_DATA_TYPE
    );
  });
});
