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
var _SoftDeleteReplyUseCase_replyRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftDeleteReplyUseCase = void 0;
const reply_locator_context_1 = require("../../domains/replies/entites/reply-locator-context");
const reply_owner_context_1 = require("../../domains/replies/entites/reply-owner.context");
class SoftDeleteReplyUseCase {
    constructor(dependencies) {
        _SoftDeleteReplyUseCase_replyRepository.set(this, void 0);
        const { replyRepository } = dependencies;
        __classPrivateFieldSet(this, _SoftDeleteReplyUseCase_replyRepository, replyRepository, "f");
    }
    async execute(payload) {
        const replyLocatorContext = new reply_locator_context_1.ReplyLocatorContext(payload);
        await __classPrivateFieldGet(this, _SoftDeleteReplyUseCase_replyRepository, "f").verifyReplyIsExists(replyLocatorContext);
        const replyOwnerContext = new reply_owner_context_1.ReplyOwnerContext(payload);
        await __classPrivateFieldGet(this, _SoftDeleteReplyUseCase_replyRepository, "f").verifyUserIsReplyOwner(replyOwnerContext);
        await __classPrivateFieldGet(this, _SoftDeleteReplyUseCase_replyRepository, "f").softDeleteReplyById(replyOwnerContext.id);
    }
}
exports.SoftDeleteReplyUseCase = SoftDeleteReplyUseCase;
_SoftDeleteReplyUseCase_replyRepository = new WeakMap();
