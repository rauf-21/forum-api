"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jme = __importStar(require("jest-mock-extended"));
const get_thread_detail_use_case_error_1 = require("../../commons/constants/applications/use-case/get-thread-detail-use-case-error");
const get_thread_detail_use_case_text_1 = require("../../commons/constants/applications/use-case/get-thread-detail-use-case-text");
const thread_detail_1 = require("../../domains/threads/entities/thread-detail");
const get_thread_detail_use_case_1 = require("./get-thread-detail-use-case");
describe("GetThreadDetailUseCase", () => {
    it("should orchestrate the get thread detail action correctly", async () => {
        const useCasePayload = {
            threadId: "thread-123",
        };
        const mockUserRepository = jme.mock();
        mockUserRepository.getUsernameById.mockResolvedValue("bono");
        const mockThreadRepository = jme.mock();
        mockThreadRepository.getThreadById.mockResolvedValue({
            id: "thread-123",
            title: "this is a title",
            body: "this is a body",
            // The data type for date is Date, not a string.
            date: new Date("2021-08-08T07:19:09.775Z"),
            owner: "user-123",
        });
        const mockCommentRepository = jme.mock();
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
        const mockCommentLikeRepository = jme.mock();
        mockCommentLikeRepository.getCommentLikeCountByCommentId.mockResolvedValue(0);
        const mockReplyRepository = jme.mock();
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
        const getThreadDetailUseCase = new get_thread_detail_use_case_1.GetThreadDetailUseCase({
            userRepository: mockUserRepository,
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
            replyRepository: mockReplyRepository,
            commentLikeRepository: mockCommentLikeRepository,
        });
        const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);
        expect(threadDetail).toEqual(new thread_detail_1.ThreadDetail({
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
                    likeCount: 0,
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
        }));
        expect(mockUserRepository.getUsernameById).toHaveBeenCalledWith("user-123");
        expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith("thread-123");
        expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith("thread-123");
        expect(mockCommentLikeRepository.getCommentLikeCountByCommentId).toHaveBeenCalledWith("comment-123");
        expect(mockReplyRepository.getRepliesByCommentId).toHaveBeenCalledWith("comment-123");
    });
    it("should throw an error if there is a missing property", async () => {
        const getThreadDetailUseCase = new get_thread_detail_use_case_1.GetThreadDetailUseCase({});
        await expect(getThreadDetailUseCase.execute({})).rejects.toThrow(get_thread_detail_use_case_error_1.GET_THREAD_DETAIL_USE_CASE_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", async () => {
        const useCasePayload = {
            threadId: 123,
        };
        const getThreadDetailUseCase = new get_thread_detail_use_case_1.GetThreadDetailUseCase({});
        await expect(getThreadDetailUseCase.execute(useCasePayload)).rejects.toThrow(get_thread_detail_use_case_error_1.GET_THREAD_DETAIL_USE_CASE_ERROR.INVALID_DATA_TYPE);
    });
    it("should redact the comment or reply if it is soft deleted", async () => {
        const useCasePayload = {
            threadId: "thread-123",
        };
        const mockUserRepository = jme.mock();
        mockUserRepository.getUsernameById.mockResolvedValue("bono");
        const mockThreadRepository = jme.mock();
        mockThreadRepository.getThreadById.mockResolvedValue({
            id: "thread-123",
            title: "this is a title",
            body: "this is a body",
            date: new Date("2021-08-08T07:19:09.775Z"),
            owner: "user-123",
        });
        const mockCommentRepository = jme.mock();
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
        const mockCommentLikeRepository = jme.mock();
        mockCommentLikeRepository.getCommentLikeCountByCommentId.mockResolvedValue(0);
        const mockReplyRepository = jme.mock();
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
        const getThreadDetailUseCase = new get_thread_detail_use_case_1.GetThreadDetailUseCase({
            userRepository: mockUserRepository,
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
            replyRepository: mockReplyRepository,
            commentLikeRepository: mockCommentLikeRepository,
        });
        const threadDetail = await getThreadDetailUseCase.execute(useCasePayload);
        expect(threadDetail).toEqual(new thread_detail_1.ThreadDetail({
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
                    content: get_thread_detail_use_case_text_1.GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_COMMENT,
                    likeCount: 0,
                    replies: [
                        {
                            id: "reply-123",
                            username: "bono",
                            date: new Date("2021-08-08T07:59:48.766Z"),
                            content: get_thread_detail_use_case_text_1.GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_REPLY,
                        },
                    ],
                },
            ],
        }));
        expect(mockUserRepository.getUsernameById).toHaveBeenCalledWith("user-123");
        expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith("thread-123");
        expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith("thread-123");
        expect(mockCommentLikeRepository.getCommentLikeCountByCommentId).toHaveBeenCalledWith("comment-123");
        expect(mockReplyRepository.getRepliesByCommentId).toHaveBeenCalledWith("comment-123");
    });
});
