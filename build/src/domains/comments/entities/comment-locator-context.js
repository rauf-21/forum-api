"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLocatorContext = void 0;
const zod_1 = require("zod");
const comment_locator_context_error_1 = require("../../../commons/constants/domains/comments/comment-locator-context-error");
const CommentLocatorContextPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: comment_locator_context_error_1.COMMENT_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY,
        invalid_type_error: comment_locator_context_error_1.COMMENT_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE,
    }),
    threadId: zod_1.z.string({
        required_error: comment_locator_context_error_1.COMMENT_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY,
        invalid_type_error: comment_locator_context_error_1.COMMENT_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE,
    }),
});
class CommentLocatorContext {
    constructor(payload) {
        const result = CommentLocatorContextPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMesssage = result.error.issues[0].message;
            throw new Error(errorMesssage);
        }
        const { id, threadId } = result.data;
        this.id = id;
        this.threadId = threadId;
    }
}
exports.CommentLocatorContext = CommentLocatorContext;
