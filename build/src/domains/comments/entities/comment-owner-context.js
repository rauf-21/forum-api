"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentOwnerContext = void 0;
const zod_1 = require("zod");
const comment_owner_context_error_1 = require("../../../commons/constants/domains/comments/comment-owner-context-error");
const CommentOwnerContextPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: comment_owner_context_error_1.COMMENT_OWNER_CONTEXT_ERROR.MISSING_PROPERTY,
        invalid_type_error: comment_owner_context_error_1.COMMENT_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: comment_owner_context_error_1.COMMENT_OWNER_CONTEXT_ERROR.MISSING_PROPERTY,
        invalid_type_error: comment_owner_context_error_1.COMMENT_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE,
    }),
});
class CommentOwnerContext {
    constructor(payload) {
        const result = CommentOwnerContextPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { id, owner } = result.data;
        this.id = id;
        this.owner = owner;
    }
}
exports.CommentOwnerContext = CommentOwnerContext;
