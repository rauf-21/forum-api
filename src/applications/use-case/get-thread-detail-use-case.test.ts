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

    const owner = "user-123";

    const username = "bono";

    const mockThread = {
      id: useCasePayload.threadId,
      title: "this is a title",
      body: "this is a body",
      date: "2021-08-08T07:19:09.775Z",
      owner,
    };

    const mockComment = {
      id: "comment-123",
      username,
      date: "2021-08-08T07:59:18.982Z",
      content: "this is a comment",
      isDeleted: false,
      owner,
      threadId: mockThread.id,
    };

    const mockReply = {
      id: "reply-123",
      username,
      date: "2021-08-08T07:59:48.766Z",
      content: "this is a reply",
      isDeleted: false,
      owner,
      commentId: mockComment.id,
    };

    const mockThreadDetail = new ThreadDetail({
      id: mockThread.id,
      title: mockThread.title,
      body: mockThread.body,
      date: mockThread.date,
      username,
      comments: [
        {
          id: mockComment.id,
          username,
          date: mockComment.date,
          content: mockComment.content,
          replies: [
            {
              id: mockReply.id,
              username,
              date: mockReply.date,
              content: mockReply.content,
            },
          ],
        },
      ],
    });

    const mockUserRepository = {
      getUsernameById: jest.fn().mockResolvedValue(username),
    } satisfies Partial<UserRepository> as unknown as UserRepository;

    const mockThreadRepository = {
      getThreadById: jest.fn().mockResolvedValue(mockThread),
    } satisfies Partial<ThreadRepository> as unknown as ThreadRepository;

    const mockCommentRepository = {
      getCommentsByThreadId: jest.fn().mockResolvedValue([mockComment]),
    } satisfies Partial<CommentRepository> as unknown as CommentRepository;

    const mockReplyRepository = {
      getRepliesByCommentId: jest.fn().mockResolvedValue([mockReply]),
    } satisfies Partial<ReplyRepository> as unknown as ReplyRepository;

    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      userRepository: mockUserRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);

    expect(threadDetail).toEqual(mockThreadDetail);
  });

  it("should throw an error if there is a missing property", async () => {
    const useCasePayload = {};

    const getThreadDetailUseCase = new GetThreadDetailUseCase(
      {} satisfies Partial<GetThreadDetailUseCaseDependencies> as unknown as GetThreadDetailUseCaseDependencies
    );

    await expect(
      getThreadDetailUseCase.execute(useCasePayload)
    ).rejects.toThrow(GET_THREAD_DETAIL_USE_CASE_ERROR.MISSING_PROPERTY);
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

  it("should redact the comment or reply content if it is soft deleted", async () => {
    const useCasePayload = {
      threadId: "thread-123",
    };

    const owner = "user-123";

    const username = "bono";

    const mockThread = {
      id: useCasePayload.threadId,
      title: "this is a title",
      body: "this is a body",
      date: "2021-08-08T07:19:09.775Z",
      owner,
    };

    const mockComment = {
      id: "comment-123",
      username,
      date: "2021-08-08T07:59:18.982Z",
      content: "this is a comment",
      isDeleted: true,
      owner,
      threadId: mockThread.id,
    };

    const mockReply = {
      id: "reply-123",
      username,
      date: "2021-08-08T07:59:48.766Z",
      content: "this is a reply",
      isDeleted: true,
      owner,
      commentId: mockComment.id,
    };

    const mockThreadDetail = new ThreadDetail({
      id: mockThread.id,
      title: mockThread.title,
      body: mockThread.body,
      date: mockThread.date,
      username,
      comments: [
        {
          id: mockComment.id,
          username,
          date: mockComment.date,
          content: GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_COMMENT,
          replies: [
            {
              id: mockReply.id,
              username,
              date: mockReply.date,
              content: GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_REPLY,
            },
          ],
        },
      ],
    });

    const mockUserRepository = {
      getUsernameById: jest.fn().mockResolvedValue(username),
    } satisfies Partial<UserRepository> as unknown as UserRepository;

    const mockThreadRepository = {
      getThreadById: jest.fn().mockResolvedValue(mockThread),
    } satisfies Partial<ThreadRepository> as unknown as ThreadRepository;

    const mockCommentRepository = {
      getCommentsByThreadId: jest.fn().mockResolvedValue([mockComment]),
    } satisfies Partial<CommentRepository> as unknown as CommentRepository;

    const mockReplyRepository = {
      getRepliesByCommentId: jest.fn().mockResolvedValue([mockReply]),
    } satisfies Partial<ReplyRepository> as unknown as ReplyRepository;

    const getThreadDetailUseCase = new GetThreadDetailUseCase({
      userRepository: mockUserRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);

    expect(threadDetail).toEqual(mockThreadDetail);
  });
});
