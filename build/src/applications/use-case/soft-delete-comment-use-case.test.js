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
const soft_delete_comment_use_case_1 = require("./soft-delete-comment-use-case");
describe("SoftDeleteCommentUseCase", () => {
    it("should orchestrate the soft delete comment action correctly", async () => {
        const useCasePayload = {
            id: "comment-123",
            owner: "user-123",
            threadId: "user-123",
        };
        const mockCommentRepository = jme.mock();
        mockCommentRepository.verifyUserIsCommentOwner.mockResolvedValue(undefined);
        mockCommentRepository.verifyCommentIsExists.mockResolvedValue(undefined);
        mockCommentRepository.softDeleteCommentById.mockResolvedValue(undefined);
        const softDeleteCommentUseCase = new soft_delete_comment_use_case_1.SoftDeleteCommentUseCase({
            commentRepository: mockCommentRepository,
        });
        await softDeleteCommentUseCase.execute(useCasePayload);
        expect(mockCommentRepository.verifyUserIsCommentOwner).toHaveBeenCalledWith(new comment_owner_context_1.CommentOwnerContext({
            id: useCasePayload.id,
            owner: useCasePayload.owner,
        }));
        expect(mockCommentRepository.verifyCommentIsExists).toHaveBeenCalledWith(new comment_locator_context_1.CommentLocatorContext({
            id: useCasePayload.id,
            threadId: useCasePayload.threadId,
        }));
        expect(mockCommentRepository.softDeleteCommentById).toHaveBeenCalledWith(useCasePayload.id);
    });
});
