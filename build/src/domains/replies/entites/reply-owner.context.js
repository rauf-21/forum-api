"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyOwnerContext = void 0;
const zod_1 = require("zod");
const reply_owner_context_error_1 = require("../../../commons/constants/domains/replies/reply-owner-context-error");
const ReplyOwnerContextPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: reply_owner_context_error_1.REPLY_OWNER_CONTEXT_ERROR.MISSING_PROPERTY,
        invalid_type_error: reply_owner_context_error_1.REPLY_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: reply_owner_context_error_1.REPLY_OWNER_CONTEXT_ERROR.MISSING_PROPERTY,
        invalid_type_error: reply_owner_context_error_1.REPLY_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE,
    }),
});
class ReplyOwnerContext {
    constructor(payload) {
        const result = ReplyOwnerContextPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { id, owner } = result.data;
        this.id = id;
        this.owner = owner;
    }
}
exports.ReplyOwnerContext = ReplyOwnerContext;
