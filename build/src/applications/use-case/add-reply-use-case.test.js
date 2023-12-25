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
const comment_locator_context_1 = require("../../domains/comments/entities/comment-locator-context");
const added_reply_1 = require("../../domains/replies/entites/added-reply");
const new_reply_1 = require("../../domains/replies/entites/new-reply");
const add_reply_use_case_1 = require("./add-reply-use-case");
describe("AddReplyUseCase", () => {
    it("should orchestrate the add reply action correctly", async () => {
        const useCasePayload = {
            content: "this is a content",
            owner: "user-123",
            threadId: "thread-123",
            commentId: "comment-123",
        };
        const mockReplyRepository = jme.mock();
        mockReplyRepository.addReply.mockResolvedValue(new added_reply_1.AddedReply({
            id: "reply-123",
            content: useCasePayload.content,
            owner: useCasePayload.owner,
        }));
        const mockThreadRepository = jme.mock();
        mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);
        const mockCommentRepository = jme.mock();
        mockCommentRepository.verifyCommentIsExists.mockResolvedValue(undefined);
        const addReplyUseCase = new add_reply_use_case_1.AddReplyUseCase({
            replyRepository: mockReplyRepository,
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });
        const addedReply = await addReplyUseCase.execute(useCasePayload);
        expect(addedReply).toEqual(new added_reply_1.AddedReply({
            id: "reply-123",
            content: useCasePayload.content,
            owner: useCasePayload.owner,
        }));
        expect(mockReplyRepository.addReply).toHaveBeenCalledWith(new new_reply_1.NewReply(useCasePayload));
        expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(useCasePayload.threadId);
        expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith(new comment_locator_context_1.CommentLocatorContext({
            id: useCasePayload.commentId,
            threadId: useCasePayload.threadId,
        }));
    });
});
