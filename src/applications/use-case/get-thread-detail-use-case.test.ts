import * as jme from "jest-mock-extended";

import { GET_THREAD_DETAIL_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/get-thread-detail-use-case-error";
import { GET_THREAD_DETAIL_USE_CASE_TEXT } from "../../commons/constants/applications/use-case/get-thread-detail-use-case-text";
import { CommentRepository } from "../../domains/comments/comment-repository";
import { ReplyRepository } from "../../domains/replies/reply-repository";
import { ThreadDetail } from "../../domains/threads/entities/thread-detail";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { UserRepository } from "../../domains/users/user-repository";
import {
  GetThreadDetailUseCase,
  GetThreadDetailUseCaseDependencies,
} from "./get-thread-detail-use-case";

describe("GetThreadDetailUseCase", () => {
  it("should orchestrate the get thread detail action correctly", async () => {
    const useCasePayload = {
      threadId: "thread-123",
    };

    const mockUserRepository = jme.mock<UserRepository>();

    mockUserRepository.getUsernameById.mockResolvedValue("bono");

    const mockThreadRepository = jme.mock<ThreadRepository>();

    mockThreadRepository.getThreadById.mockResolvedValue({
      id: "thread-123",
      title: "this is a title",
      body: "this is a body",
      date: new Date("2021-08-08T07:19:09.775Z"),
      owner: "user-123",
    });

    const mockCommentRepository = jme.mock<CommentRepository>();

    mockCommentRepository.getCommentsByThreadId.mockResolvedValue([
      {
        id: "comment-123",
        date: new Date("2021-08-08T07:59:18.982Z"),
        content: "this is a comment",
        isDeleted: false,
        owner: "user-123",
        threadId: "thread-123",
      },
    ]);

    const mockReplyRepository = jme.mock<ReplyRepository>();

    mockReplyRepository.getRepliesByCommentId.mockResolvedValue([
      {
        id: "reply-123",
        date: new Date("2021-08-08T07:59:48.766Z"),
        content: "this is a reply",
        isDeleted: false,
        owner: "user-123",
        commentId: "comment-123",
      },
    ]);

    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      userRepository: mockUserRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);

    expect(threadDetail).toEqual(
      new ThreadDetail({
        id: "thread-123",
        title: "this is a title",
        body: "this is a body",
        date: new Date("2021-08-08T07:19:09.775Z"),
        username: "bono",
        comments: [
          {
            id: "comment-123",
            username: "bono",
            date: new Date("2021-08-08T07:59:18.982Z"),
            content: "this is a comment",
            replies: [
              {
                id: "reply-123",
                username: "bono",
                date: new Date("2021-08-08T07:59:48.766Z"),
                content: "this is a reply",
              },
            ],
          },
        ],
      })
    );
    expect(mockUserRepository.getUsernameById).toHaveBeenCalledWith("user-123");
    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(
      "thread-123"
    );
    expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith(
      "thread-123"
    );
    expect(mockReplyRepository.getRepliesByCommentId).toHaveBeenCalledWith(
      "comment-123"
    );
  });

  it("should throw an error if there is a missing property", async () => {
    const getThreadDetailUseCase = new GetThreadDetailUseCase(
      {} satisfies Partial<GetThreadDetailUseCaseDependencies> as unknown as GetThreadDetailUseCaseDependencies
    );

    await expect(getThreadDetailUseCase.execute({})).rejects.toThrow(
      GET_THREAD_DETAIL_USE_CASE_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", async () => {
    const useCasePayload = {
      threadId: 123,
    };

    const getThreadDetailUseCase = new GetThreadDetailUseCase(
      {} satisfies Partial<GetThreadDetailUseCaseDependencies> as unknown as GetThreadDetailUseCaseDependencies
    );

    await expect(
      getThreadDetailUseCase.execute(useCasePayload)
    ).rejects.toThrow(GET_THREAD_DETAIL_USE_CASE_ERROR.INVALID_DATA_TYPE);
  });

  it("should redact the comment or reply if it is soft deleted", async () => {
    const useCasePayload = {
      threadId: "thread-123",
    };

    const mockUserRepository = jme.mock<UserRepository>();

    mockUserRepository.getUsernameById.mockResolvedValue("bono");

    const mockThreadRepository = jme.mock<ThreadRepository>();

    mockThreadRepository.getThreadById.mockResolvedValue({
      id: "thread-123",
      title: "this is a title",
      body: "this is a body",
      date: new Date("2021-08-08T07:19:09.775Z"),
      owner: "user-123",
    });

    const mockCommentRepository = jme.mock<CommentRepository>();

    mockCommentRepository.getCommentsByThreadId.mockResolvedValue([
      {
        id: "comment-123",
        date: new Date("2021-08-08T07:59:18.982Z"),
        content: "this is a comment",
        isDeleted: true,
        owner: "user-123",
        threadId: "thread-123",
      },
    ]);

    const mockReplyRepository = jme.mock<ReplyRepository>();

    mockReplyRepository.getRepliesByCommentId.mockResolvedValue([
      {
        id: "reply-123",
        date: new Date("2021-08-08T07:59:48.766Z"),
        content: "this is a reply",
        isDeleted: true,
        owner: "user-123",
        commentId: "comment-123",
      },
    ]);

    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      userRepository: mockUserRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);

    expect(threadDetail).toEqual(
      new ThreadDetail({
        id: "thread-123",
        title: "this is a title",
        body: "this is a body",
        date: new Date("2021-08-08T07:19:09.775Z"),
        username: "bono",
        comments: [
          {
            id: "comment-123",
            username: "bono",
            date: new Date("2021-08-08T07:59:18.982Z"),
            content: GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_COMMENT,
            replies: [
              {
                id: "reply-123",
                username: "bono",
                date: new Date("2021-08-08T07:59:48.766Z"),
                content: GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_REPLY,
              },
            ],
          },
        ],
      })
    );
    expect(mockUserRepository.getUsernameById).toHaveBeenCalledWith("user-123");
    expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(
      "thread-123"
    );
    expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith(
      "thread-123"
    );
    expect(mockReplyRepository.getRepliesByCommentId).toHaveBeenCalledWith(
      "comment-123"
    );
  });
});
