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
var _RepliesHandler_addReplyUseCase, _RepliesHandler_softDeleteReplyUseCase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesHandler = void 0;
class RepliesHandler {
    constructor(dependencies) {
        _RepliesHandler_addReplyUseCase.set(this, void 0);
        _RepliesHandler_softDeleteReplyUseCase.set(this, void 0);
        const { addReplyUseCase, softDeleteReplyUseCase } = dependencies;
        __classPrivateFieldSet(this, _RepliesHandler_addReplyUseCase, addReplyUseCase, "f");
        __classPrivateFieldSet(this, _RepliesHandler_softDeleteReplyUseCase, softDeleteReplyUseCase, "f");
        this.postReplyHandler = this.postReplyHandler.bind(this);
        this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
    }
    async postReplyHandler(request, h) {
        const { id: owner } = request.auth.credentials;
        const { threadId, commentId } = request.params;
        const payload = typeof request.payload === "object"
            ? Object.assign(Object.assign({}, request.payload), { owner, threadId, commentId }) : request.payload;
        const addedReply = await __classPrivateFieldGet(this, _RepliesHandler_addReplyUseCase, "f").execute(payload);
        return h
            .response({
            status: "success",
            data: {
                addedReply,
            },
        })
            .code(201);
    }
    async deleteReplyHandler(request) {
        const { id: owner } = request.auth.credentials;
        const { threadId, commentId, replyId } = request.params;
        await __classPrivateFieldGet(this, _RepliesHandler_softDeleteReplyUseCase, "f").execute({
            id: replyId,
            owner,
            threadId,
            commentId,
        });
        return {
            status: "success",
        };
    }
}
exports.RepliesHandler = RepliesHandler;
_RepliesHandler_addReplyUseCase = new WeakMap(), _RepliesHandler_softDeleteReplyUseCase = new WeakMap();
