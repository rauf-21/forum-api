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
var _AddReplyUseCase_replyRepository, _AddReplyUseCase_threadRepository, _AddReplyUseCase_commentRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddReplyUseCase = void 0;
const new_reply_1 = require("../../domains/replies/entites/new-reply");
class AddReplyUseCase {
    constructor(dependencies) {
        _AddReplyUseCase_replyRepository.set(this, void 0);
        _AddReplyUseCase_threadRepository.set(this, void 0);
        _AddReplyUseCase_commentRepository.set(this, void 0);
        const { replyRepository, threadRepository, commentRepository } = dependencies;
        __classPrivateFieldSet(this, _AddReplyUseCase_replyRepository, replyRepository, "f");
        __classPrivateFieldSet(this, _AddReplyUseCase_threadRepository, threadRepository, "f");
        __classPrivateFieldSet(this, _AddReplyUseCase_commentRepository, commentRepository, "f");
    }
    async execute(payload) {
        const newReply = new new_reply_1.NewReply(payload);
        await __classPrivateFieldGet(this, _AddReplyUseCase_threadRepository, "f").verifyThreadIsExists(newReply.threadId);
        await __classPrivateFieldGet(this, _AddReplyUseCase_commentRepository, "f").verifyCommentIsExists({
            id: newReply.commentId,
            threadId: newReply.threadId,
        });
        const addedReply = await __classPrivateFieldGet(this, _AddReplyUseCase_replyRepository, "f").addReply(newReply);
        return addedReply;
    }
}
exports.AddReplyUseCase = AddReplyUseCase;
_AddReplyUseCase_replyRepository = new WeakMap(), _AddReplyUseCase_threadRepository = new WeakMap(), _AddReplyUseCase_commentRepository = new WeakMap();
