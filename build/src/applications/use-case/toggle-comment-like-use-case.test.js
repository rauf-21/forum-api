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
const comment_owner_context_1 = require("../../domains/comments/entities/comment-owner-context");
const toggle_comment_like_use_case_1 = require("./toggle-comment-like-use-case");
describe("ToggleCommentLikeUseCase", () => {
    it("should orchestrate the toggle comment like action correctly", async () => {
        const useCasePayload = {
            id: "comment-123",
            threadId: "thread-123",
            owner: "user-123",
        };
        const mockThreadRepository = jme.mock();
        mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);
        const mockCommentRepository = jme.mock();
        mockCommentRepository.verifyCommentIsExists.mockResolvedValue(undefined);
        const mockCommentLikeRepository = jme.mock();
        mockCommentLikeRepository.isCommentLiked
            .mockResolvedValueOnce(false)
            .mockResolvedValueOnce(true);
        mockCommentLikeRepository.likeComment.mockResolvedValue(undefined);
        mockCommentLikeRepository.unlikeComment.mockResolvedValue(undefined);
        const toggleCommentLikeUseCase = new toggle_comment_like_use_case_1.ToggleCommentLikeUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
            commentLikeRepository: mockCommentLikeRepository,
        });
        await toggleCommentLikeUseCase.execute(useCasePayload);
        const expectedCommentOwnerContext = new comment_owner_context_1.CommentOwnerContext({
            id: useCasePayload.id,
            owner: useCasePayload.owner,
        });
        expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(useCasePayload.threadId);
        expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith(new comment_locator_context_1.CommentLocatorContext({
            id: useCasePayload.id,
            threadId: useCasePayload.threadId,
        }));
        expect(mockCommentLikeRepository.isCommentLiked).toHaveBeenCalledWith(expectedCommentOwnerContext);
        expect(mockCommentLikeRepository.likeComment).toHaveBeenCalledWith(expectedCommentOwnerContext);
        await toggleCommentLikeUseCase.execute(useCasePayload);
        expect(mockCommentLikeRepository.unlikeComment).toHaveBeenCalledWith(expectedCommentOwnerContext);
    });
});
