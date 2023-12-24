import { THREAD_DETAIL_ERROR } from "../../../commons/constants/domains/threads/thread-detail-error";
import { ThreadDetail } from "./thread-detail";

describe("ThreadDetail entities", () => {
  it("should be able to create the threadDetail object correctly", () => {
    const payload = {
      id: "thread-123",
      title: "this is a title",
      body: "this is a body",
      date: "2021-08-08T07:19:09.775Z",
      username: "bono",
      comments: [
        {
          id: "comment-123",
          username: "miko",
          date: "2021-08-08T07:59:18.982Z",
          content: "this is a comment",
          replies: [
            {
              id: "reply-123",
              username: "rein",
              date: "2021-08-08T07:59:48.766Z",
              content: "**The reply has been deleted**",
            },
          ],
        },
      ],
    };

    const { id, title, body, date, username, comments } = new ThreadDetail(
      payload
    );

    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(comments).toEqual(payload.comments);
  });

  it("should throw an error if there is a missing property", () => {
    const payloadA = {};

    const payloadB = {
      id: "thread-123",
      title: "this is a title",
      body: "this is a body",
      date: "2021-08-08T07:19:09.775Z",
      username: "bono",
      comments: [{}],
    };

    const payloadC = {
      ...payloadB,
      comments: [
        {
          id: "comment-123",
          username: "miko",
          date: "2021-08-08T07:59:18.982Z",
          content: "this is a comment",
          replies: [{}],
        },
      ],
    };

    expect(() => new ThreadDetail(payloadA)).toThrow(
      THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY
    );
    expect(() => new ThreadDetail(payloadB)).toThrow(
      THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY
    );
    expect(() => new ThreadDetail(payloadC)).toThrow(
      THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", () => {
    const payloadA = {
      id: 123,
    };

    const payloadB = {
      id: "thread-123",
      title: "this is a title",
      body: "this is a body",
      date: "2021-08-08T07:19:09.775Z",
      username: "bono",
      comments: [
        {
          id: 123,
        },
      ],
    };

    const payloadC = {
      ...payloadB,
      comments: [
        {
          id: "comment-123",
          username: "miko",
          date: "2021-08-08T07:59:18.982Z",
          content: "this is a comment",
          replies: [
            {
              id: 123,
            },
          ],
        },
      ],
    };

    expect(() => new ThreadDetail(payloadA)).toThrow(
      THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE
    );
    expect(() => new ThreadDetail(payloadB)).toThrow(
      THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE
    );
    expect(() => new ThreadDetail(payloadC)).toThrow(
      THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE
    );
  });
});
