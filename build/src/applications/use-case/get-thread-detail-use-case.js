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
var _GetThreadDetailUseCase_userRepository, _GetThreadDetailUseCase_threadRepository, _GetThreadDetailUseCase_commentRepository, _GetThreadDetailUseCase_replyRepository, _GetThreadDetailUseCase_commentLikeRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetThreadDetailUseCase = void 0;
const zod_1 = require("zod");
const get_thread_detail_use_case_error_1 = require("../../commons/constants/applications/use-case/get-thread-detail-use-case-error");
const get_thread_detail_use_case_text_1 = require("../../commons/constants/applications/use-case/get-thread-detail-use-case-text");
const thread_detail_1 = require("../../domains/threads/entities/thread-detail");
const GetThreadDetailUseCasePayloadSchema = zod_1.z.object({
    threadId: zod_1.z.string({
        required_error: get_thread_detail_use_case_error_1.GET_THREAD_DETAIL_USE_CASE_ERROR.MISSING_PROPERTY,
        invalid_type_error: get_thread_detail_use_case_error_1.GET_THREAD_DETAIL_USE_CASE_ERROR.INVALID_DATA_TYPE,
    }),
});
class GetThreadDetailUseCase {
    constructor(dependencies) {
        _GetThreadDetailUseCase_userRepository.set(this, void 0);
        _GetThreadDetailUseCase_threadRepository.set(this, void 0);
        _GetThreadDetailUseCase_commentRepository.set(this, void 0);
        _GetThreadDetailUseCase_replyRepository.set(this, void 0);
        _GetThreadDetailUseCase_commentLikeRepository.set(this, void 0);
        const { userRepository, threadRepository, commentRepository, replyRepository, commentLikeRepository, } = dependencies;
        __classPrivateFieldSet(this, _GetThreadDetailUseCase_userRepository, userRepository, "f");
        __classPrivateFieldSet(this, _GetThreadDetailUseCase_threadRepository, threadRepository, "f");
        __classPrivateFieldSet(this, _GetThreadDetailUseCase_commentRepository, commentRepository, "f");
        __classPrivateFieldSet(this, _GetThreadDetailUseCase_replyRepository, replyRepository, "f");
        __classPrivateFieldSet(this, _GetThreadDetailUseCase_commentLikeRepository, commentLikeRepository, "f");
    }
    async execute(payload) {
        const result = GetThreadDetailUseCasePayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { threadId } = result.data;
        const thread = await __classPrivateFieldGet(this, _GetThreadDetailUseCase_threadRepository, "f").getThreadById(threadId);
        const threadOwnerUsername = await __classPrivateFieldGet(this, _GetThreadDetailUseCase_userRepository, "f").getUsernameById(thread.owner);
        const comments = await __classPrivateFieldGet(this, _GetThreadDetailUseCase_commentRepository, "f").getCommentsByThreadId(thread.id);
        const formattedComments = await Promise.all(comments.map(async (comment) => {
            const commenterUsername = await __classPrivateFieldGet(this, _GetThreadDetailUseCase_userRepository, "f").getUsernameById(comment.owner);
            const replies = await __classPrivateFieldGet(this, _GetThreadDetailUseCase_replyRepository, "f").getRepliesByCommentId(comment.id);
            const commentContent = comment.isDeleted
                ? get_thread_detail_use_case_text_1.GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_COMMENT
                : comment.content;
            const likeCount = await __classPrivateFieldGet(this, _GetThreadDetailUseCase_commentLikeRepository, "f").getCommentLikeCountByCommentId(comment.id);
            const formattedReplies = await Promise.all(replies.map(async (reply) => {
                const replierUsername = await __classPrivateFieldGet(this, _GetThreadDetailUseCase_userRepository, "f").getUsernameById(reply.owner);
                const replyContent = reply.isDeleted
                    ? get_thread_detail_use_case_text_1.GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_REPLY
                    : reply.content;
                return {
                    id: reply.id,
                    date: reply.date,
                    username: replierUsername,
                    content: replyContent,
                };
            }));
            return {
                id: comment.id,
                date: comment.date,
                username: commenterUsername,
                content: commentContent,
                likeCount,
                replies: formattedReplies,
            };
        }));
        return new thread_detail_1.ThreadDetail({
            id: thread.id,
            title: thread.title,
            body: thread.body,
            date: thread.date,
            username: threadOwnerUsername,
            comments: formattedComments,
        });
    }
}
exports.GetThreadDetailUseCase = GetThreadDetailUseCase;
_GetThreadDetailUseCase_userRepository = new WeakMap(), _GetThreadDetailUseCase_threadRepository = new WeakMap(), _GetThreadDetailUseCase_commentRepository = new WeakMap(), _GetThreadDetailUseCase_replyRepository = new WeakMap(), _GetThreadDetailUseCase_commentLikeRepository = new WeakMap();
