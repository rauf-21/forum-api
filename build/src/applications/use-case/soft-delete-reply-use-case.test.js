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
const soft_delete_reply_use_case_error_1 = require("../../commons/constants/applications/use-case/soft-delete-reply-use-case-error");
const comment_locator_context_1 = require("../../domains/comments/entities/comment-locator-context");
const reply_locator_context_1 = require("../../domains/replies/entites/reply-locator-context");
const reply_owner_context_1 = require("../../domains/replies/entites/reply-owner.context");
const soft_delete_reply_use_case_1 = require("./soft-delete-reply-use-case");
describe("SoftDeleteReplyUseCase", () => {
    it("should orchestrate the soft delete reply action correctly", async () => {
        const useCasePayload = {
            id: "reply-123",
            owner: "user-123",
            threadId: "thread-123",
            commentId: "comment-123",
        };
        const mockThreadRepository = jme.mock();
        mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);
        const mockCommentRepository = jme.mock();
        mockCommentRepository.verifyCommentIsExists.mockResolvedValue(undefined);
        const mockReplyRepository = jme.mock();
        mockReplyRepository.verifyUserIsReplyOwner.mockResolvedValue(undefined);
        mockReplyRepository.verifyReplyIsExists.mockResolvedValue(undefined);
        mockReplyRepository.softDeleteReplyById.mockResolvedValue(undefined);
        const softDeleteReplyUseCase = new soft_delete_reply_use_case_1.SoftDeleteReplyUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
            replyRepository: mockReplyRepository,
        });
        await softDeleteReplyUseCase.execute(useCasePayload);
        expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(useCasePayload.threadId);
        expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith(new comment_locator_context_1.CommentLocatorContext({
            id: useCasePayload.commentId,
            threadId: useCasePayload.threadId,
        }));
        expect(mockReplyRepository.verifyReplyIsExists).toHaveBeenCalledWith(new reply_locator_context_1.ReplyLocatorContext({
            id: useCasePayload.id,
            commentId: useCasePayload.commentId,
        }));
        expect(mockReplyRepository.verifyUserIsReplyOwner).toHaveBeenCalledWith(new reply_owner_context_1.ReplyOwnerContext({
            id: useCasePayload.id,
            owner: useCasePayload.owner,
        }));
        expect(mockReplyRepository.softDeleteReplyById).toHaveBeenCalledWith(useCasePayload.id);
    });
    it("should throw an error if there is a missing property", async () => {
        const softDeleteReplyUseCase = new soft_delete_reply_use_case_1.SoftDeleteReplyUseCase({});
        await expect(softDeleteReplyUseCase.execute({})).rejects.toThrow(soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", async () => {
        const softDeleteReplyUseCase = new soft_delete_reply_use_case_1.SoftDeleteReplyUseCase({});
        await expect(softDeleteReplyUseCase.execute({ id: 123 })).rejects.toThrow(soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE);
    });
});
