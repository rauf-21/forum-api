"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyLocatorContext = void 0;
const zod_1 = require("zod");
const reply_locator_context_error_1 = require("../../../commons/constants/domains/replies/reply-locator-context-error");
const ReplyLocatorContextPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: reply_locator_context_error_1.REPLY_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY,
        invalid_type_error: reply_locator_context_error_1.REPLY_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE,
    }),
    commentId: zod_1.z.string({
        required_error: reply_locator_context_error_1.REPLY_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY,
        invalid_type_error: reply_locator_context_error_1.REPLY_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE,
    }),
});
class ReplyLocatorContext {
    constructor(payload) {
        const result = ReplyLocatorContextPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { id, commentId } = result.data;
        this.id = id;
        this.commentId = commentId;
    }
}
exports.ReplyLocatorContext = ReplyLocatorContext;
