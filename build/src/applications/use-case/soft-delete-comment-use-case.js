"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SoftDeleteCommentUseCase_threadRepository, _SoftDeleteCommentUseCase_commentRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteCommentUseCase = void 0;
const comment_locator_context_1 = require("../../domains/comments/entities/comment-locator-context");
const comment_owner_context_1 = require("../../domains/comments/entities/comment-owner-context");
class SoftDeleteCommentUseCase {
    constructor(dependencies) {
        _SoftDeleteCommentUseCase_threadRepository.set(this, void 0);
        _SoftDeleteCommentUseCase_commentRepository.set(this, void 0);
        const { threadRepository, commentRepository } = dependencies;
        __classPrivateFieldSet(this, _SoftDeleteCommentUseCase_threadRepository, threadRepository, "f");
        __classPrivateFieldSet(this, _SoftDeleteCommentUseCase_commentRepository, commentRepository, "f");
    }
    async execute(payload) {
        const commentLocatorContext = new comment_locator_context_1.CommentLocatorContext(payload);
        await __classPrivateFieldGet(this, _SoftDeleteCommentUseCase_threadRepository, "f").verifyThreadIsExists(commentLocatorContext.threadId);
        await __classPrivateFieldGet(this, _SoftDeleteCommentUseCase_commentRepository, "f").verifyCommentIsExists(commentLocatorContext);
        const commentOwnerContext = new comment_owner_context_1.CommentOwnerContext(payload);
        await __classPrivateFieldGet(this, _SoftDeleteCommentUseCase_commentRepository, "f").verifyUserIsCommentOwner(commentOwnerContext);
        await __classPrivateFieldGet(this, _SoftDeleteCommentUseCase_commentRepository, "f").softDeleteCommentById(commentOwnerContext.id);
    }
}
exports.SoftDeleteCommentUseCase = SoftDeleteCommentUseCase;
_SoftDeleteCommentUseCase_threadRepository = new WeakMap(), _SoftDeleteCommentUseCase_commentRepository = new WeakMap();
