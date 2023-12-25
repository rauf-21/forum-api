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
var _SoftDeleteReplyUseCase_threadRepository, _SoftDeleteReplyUseCase_commentRepository, _SoftDeleteReplyUseCase_replyRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteReplyUseCase = void 0;
const zod_1 = require("zod");
const soft_delete_reply_use_case_error_1 = require("../../commons/constants/applications/use-case/soft-delete-reply-use-case-error");
const comment_locator_context_1 = require("../../domains/comments/entities/comment-locator-context");
const reply_locator_context_1 = require("../../domains/replies/entites/reply-locator-context");
const reply_owner_context_1 = require("../../domains/replies/entites/reply-owner.context");
const SoftDeleteReplyUseCasePayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY,
        invalid_type_error: soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY,
        invalid_type_error: soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE,
    }),
    threadId: zod_1.z.string({
        required_error: soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY,
        invalid_type_error: soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE,
    }),
    commentId: zod_1.z.string({
        required_error: soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY,
        invalid_type_error: soft_delete_reply_use_case_error_1.SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE,
    }),
});
class SoftDeleteReplyUseCase {
    constructor(dependencies) {
        _SoftDeleteReplyUseCase_threadRepository.set(this, void 0);
        _SoftDeleteReplyUseCase_commentRepository.set(this, void 0);
        _SoftDeleteReplyUseCase_replyRepository.set(this, void 0);
        const { threadRepository, commentRepository, replyRepository } = dependencies;
        __classPrivateFieldSet(this, _SoftDeleteReplyUseCase_threadRepository, threadRepository, "f");
        __classPrivateFieldSet(this, _SoftDeleteReplyUseCase_commentRepository, commentRepository, "f");
        __classPrivateFieldSet(this, _SoftDeleteReplyUseCase_replyRepository, replyRepository, "f");
    }
    async execute(payload) {
        const result = SoftDeleteReplyUseCasePayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { threadId, commentId } = result.data;
        const commentLocatorContext = new comment_locator_context_1.CommentLocatorContext({
            id: commentId,
            threadId,
        });
        const replyLocatorContext = new reply_locator_context_1.ReplyLocatorContext(payload);
        await __classPrivateFieldGet(this, _SoftDeleteReplyUseCase_threadRepository, "f").verifyThreadIsExists(threadId);
        await __classPrivateFieldGet(this, _SoftDeleteReplyUseCase_commentRepository, "f").verifyCommentIsExists(commentLocatorContext);
        await __classPrivateFieldGet(this, _SoftDeleteReplyUseCase_replyRepository, "f").verifyReplyIsExists(replyLocatorContext);
        const replyOwnerContext = new reply_owner_context_1.ReplyOwnerContext(payload);
        await __classPrivateFieldGet(this, _SoftDeleteReplyUseCase_replyRepository, "f").verifyUserIsReplyOwner(replyOwnerContext);
        await __classPrivateFieldGet(this, _SoftDeleteReplyUseCase_replyRepository, "f").softDeleteReplyById(replyOwnerContext.id);
    }
}
exports.SoftDeleteReplyUseCase = SoftDeleteReplyUseCase;
_SoftDeleteReplyUseCase_threadRepository = new WeakMap(), _SoftDeleteReplyUseCase_commentRepository = new WeakMap(), _SoftDeleteReplyUseCase_replyRepository = new WeakMap();
