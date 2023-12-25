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
var _AddCommentUseCase_commentRepository, _AddCommentUseCase_threadRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommentUseCase = void 0;
const new_comment_1 = require("../../domains/comments/entities/new-comment");
class AddCommentUseCase {
    constructor(dependencies) {
        _AddCommentUseCase_commentRepository.set(this, void 0);
        _AddCommentUseCase_threadRepository.set(this, void 0);
        const { commentRepository, threadRepository } = dependencies;
        __classPrivateFieldSet(this, _AddCommentUseCase_commentRepository, commentRepository, "f");
        __classPrivateFieldSet(this, _AddCommentUseCase_threadRepository, threadRepository, "f");
    }
    async execute(payload) {
        const newComment = new new_comment_1.NewComment(payload);
        await __classPrivateFieldGet(this, _AddCommentUseCase_threadRepository, "f").verifyThreadIsExists(newComment.threadId);
        const addedComment = await __classPrivateFieldGet(this, _AddCommentUseCase_commentRepository, "f").addComment(newComment);
        return addedComment;
    }
}
exports.AddCommentUseCase = AddCommentUseCase;
_AddCommentUseCase_commentRepository = new WeakMap(), _AddCommentUseCase_threadRepository = new WeakMap();
