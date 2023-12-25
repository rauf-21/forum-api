"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedReply = void 0;
const zod_1 = require("zod");
const added_reply_error_1 = require("../../../commons/constants/domains/replies/added-reply-error");
const AddedReplyPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: added_reply_error_1.ADDED_REPLY_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_reply_error_1.ADDED_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
    content: zod_1.z.string({
        required_error: added_reply_error_1.ADDED_REPLY_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_reply_error_1.ADDED_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: added_reply_error_1.ADDED_REPLY_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_reply_error_1.ADDED_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
});
class AddedReply {
    constructor(payload) {
        const result = AddedReplyPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { id, content, owner } = result.data;
        this.id = id;
        this.content = content;
        this.owner = owner;
    }
}
exports.AddedReply = AddedReply;
