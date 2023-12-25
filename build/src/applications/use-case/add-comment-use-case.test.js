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
const added_comment_1 = require("../../domains/comments/entities/added-comment");
const new_comment_1 = require("../../domains/comments/entities/new-comment");
const add_comment_use_case_1 = require("./add-comment-use-case");
describe("AddCommentUseCase", () => {
    it("should orchestrate the add comment action correctly", async () => {
        const useCasePayload = {
            content: "this is a content",
            owner: "user-123",
            threadId: "thread-123",
        };
        const mockCommentRepository = jme.mock();
        mockCommentRepository.addComment.mockResolvedValue(new added_comment_1.AddedComment({
            id: "comment-123",
            content: useCasePayload.content,
            owner: useCasePayload.owner,
        }));
        const mockThreadRepository = jme.mock();
        mockThreadRepository.verifyThreadIsExists.mockResolvedValue(undefined);
        const addCommentUseCase = new add_comment_use_case_1.AddCommentUseCase({
            commentRepository: mockCommentRepository,
            threadRepository: mockThreadRepository,
        });
        const addedComment = await addCommentUseCase.execute(useCasePayload);
        expect(addedComment).toEqual(new added_comment_1.AddedComment({
            id: "comment-123",
            content: useCasePayload.content,
            owner: useCasePayload.owner,
        }));
        expect(mockCommentRepository.addComment).toHaveBeenCalledWith(new new_comment_1.NewComment(useCasePayload));
        expect(mockThreadRepository.verifyThreadIsExists).toHaveBeenCalledWith(useCasePayload.threadId);
    });
});
