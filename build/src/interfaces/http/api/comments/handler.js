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
var _CommentsHandler_addCommentUseCase, _CommentsHandler_softDeleteCommentUseCase, _CommentsHandler_toggleCommentLikeUseCase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsHandler = void 0;
class CommentsHandler {
    constructor(dependencies) {
        _CommentsHandler_addCommentUseCase.set(this, void 0);
        _CommentsHandler_softDeleteCommentUseCase.set(this, void 0);
        _CommentsHandler_toggleCommentLikeUseCase.set(this, void 0);
        const { addCommentUseCase, softDeleteCommentUseCase, toggleCommentLikeUseCase, } = dependencies;
        __classPrivateFieldSet(this, _CommentsHandler_addCommentUseCase, addCommentUseCase, "f");
        __classPrivateFieldSet(this, _CommentsHandler_softDeleteCommentUseCase, softDeleteCommentUseCase, "f");
        __classPrivateFieldSet(this, _CommentsHandler_toggleCommentLikeUseCase, toggleCommentLikeUseCase, "f");
        this.postCommentHandler = this.postCommentHandler.bind(this);
        this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
        this.toggleCommentLikeHandler = this.toggleCommentLikeHandler.bind(this);
    }
    async postCommentHandler(request, h) {
        const { id: owner } = request.auth.credentials;
        const { threadId } = request.params;
        const payload = typeof request.payload === "object"
            ? Object.assign(Object.assign({}, request.payload), { owner, threadId }) : request.payload;
        const addedComment = await __classPrivateFieldGet(this, _CommentsHandler_addCommentUseCase, "f").execute(payload);
        return h
            .response({
            status: "success",
            data: {
                addedComment,
            },
        })
            .code(201);
    }
    async deleteCommentHandler(request) {
        const { id: owner } = request.auth.credentials;
        const { threadId, commentId } = request.params;
        await __classPrivateFieldGet(this, _CommentsHandler_softDeleteCommentUseCase, "f").execute({
            id: commentId,
            owner,
            threadId,
        });
        return {
            status: "success",
        };
    }
    async toggleCommentLikeHandler(request) {
        const { id: owner } = request.auth.credentials;
        const { threadId, commentId } = request.params;
        await __classPrivateFieldGet(this, _CommentsHandler_toggleCommentLikeUseCase, "f").execute({
            id: commentId,
            threadId,
            owner,
        });
        return {
            status: "success",
        };
    }
}
exports.CommentsHandler = CommentsHandler;
_CommentsHandler_addCommentUseCase = new WeakMap(), _CommentsHandler_softDeleteCommentUseCase = new WeakMap(), _CommentsHandler_toggleCommentLikeUseCase = new WeakMap();
