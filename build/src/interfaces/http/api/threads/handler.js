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
var _ThreadsHandler_addThreadUseCase, _ThreadsHandler_getThreadDetailUseCase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsHandler = void 0;
class ThreadsHandler {
    constructor(dependencies) {
        _ThreadsHandler_addThreadUseCase.set(this, void 0);
        _ThreadsHandler_getThreadDetailUseCase.set(this, void 0);
        const { addThreadUseCase, getThreadDetailUseCase } = dependencies;
        __classPrivateFieldSet(this, _ThreadsHandler_addThreadUseCase, addThreadUseCase, "f");
        __classPrivateFieldSet(this, _ThreadsHandler_getThreadDetailUseCase, getThreadDetailUseCase, "f");
        this.postThreadHandler = this.postThreadHandler.bind(this);
        this.getThreadHandler = this.getThreadHandler.bind(this);
    }
    async postThreadHandler(request, h) {
        const { id: owner } = request.auth.credentials;
        const payload = typeof request.payload === "object"
            ? Object.assign({ owner }, request.payload) : request.payload;
        const addedThread = await __classPrivateFieldGet(this, _ThreadsHandler_addThreadUseCase, "f").execute(payload);
        return h
            .response({
            status: "success",
            data: {
                addedThread,
            },
        })
            .code(201);
    }
    async getThreadHandler(request) {
        const { threadId } = request.params;
        const detailThread = await __classPrivateFieldGet(this, _ThreadsHandler_getThreadDetailUseCase, "f").execute({
            threadId,
        });
        return {
            status: "success",
            data: {
                thread: detailThread,
            },
        };
    }
}
exports.ThreadsHandler = ThreadsHandler;
_ThreadsHandler_addThreadUseCase = new WeakMap(), _ThreadsHandler_getThreadDetailUseCase = new WeakMap();
