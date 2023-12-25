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
var _ToggleCommentLikeUseCase_threadRepository, _ToggleCommentLikeUseCase_commentRepository, _ToggleCommentLikeUseCase_commentLikeRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleCommentLikeUseCase = void 0;
const comment_locator_context_1 = require("../../domains/comments/entities/comment-locator-context");
const comment_owner_context_1 = require("../../domains/comments/entities/comment-owner-context");
class ToggleCommentLikeUseCase {
    constructor(dependencies) {
        _ToggleCommentLikeUseCase_threadRepository.set(this, void 0);
        _ToggleCommentLikeUseCase_commentRepository.set(this, void 0);
        _ToggleCommentLikeUseCase_commentLikeRepository.set(this, void 0);
        const { threadRepository, commentRepository, commentLikeRepository } = dependencies;
        __classPrivateFieldSet(this, _ToggleCommentLikeUseCase_threadRepository, threadRepository, "f");
        __classPrivateFieldSet(this, _ToggleCommentLikeUseCase_commentRepository, commentRepository, "f");
        __classPrivateFieldSet(this, _ToggleCommentLikeUseCase_commentLikeRepository, commentLikeRepository, "f");
    }
    async execute(payload) {
        const commentLocatorContext = new comment_locator_context_1.CommentLocatorContext(payload);
        const commentOwnerContext = new comment_owner_context_1.CommentOwnerContext(payload);
        await __classPrivateFieldGet(this, _ToggleCommentLikeUseCase_threadRepository, "f").verifyThreadIsExists(commentLocatorContext.threadId);
        await __classPrivateFieldGet(this, _ToggleCommentLikeUseCase_commentRepository, "f").verifyCommentIsExists(commentLocatorContext);
        const isCommentLiked = await __classPrivateFieldGet(this, _ToggleCommentLikeUseCase_commentLikeRepository, "f").isCommentLiked(commentOwnerContext);
        if (isCommentLiked) {
            await __classPrivateFieldGet(this, _ToggleCommentLikeUseCase_commentLikeRepository, "f").unlikeComment(commentOwnerContext);
            return;
        }
        await __classPrivateFieldGet(this, _ToggleCommentLikeUseCase_commentLikeRepository, "f").likeComment(commentOwnerContext);
    }
}
exports.ToggleCommentLikeUseCase = ToggleCommentLikeUseCase;
_ToggleCommentLikeUseCase_threadRepository = new WeakMap(), _ToggleCommentLikeUseCase_commentRepository = new WeakMap(), _ToggleCommentLikeUseCase_commentLikeRepository = new WeakMap();
