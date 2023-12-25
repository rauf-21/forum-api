"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewReply = void 0;
const zod_1 = require("zod");
const new_reply_error_1 = require("../../../commons/constants/domains/replies/new-reply-error");
const NewReplyPayloadSchema = zod_1.z.object({
    content: zod_1.z.string({
        required_error: new_reply_error_1.NEW_REPLY_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_reply_error_1.NEW_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: new_reply_error_1.NEW_REPLY_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_reply_error_1.NEW_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
    threadId: zod_1.z.string({
        required_error: new_reply_error_1.NEW_REPLY_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_reply_error_1.NEW_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
    commentId: zod_1.z.string({
        required_error: new_reply_error_1.NEW_REPLY_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_reply_error_1.NEW_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
}, {
    required_error: new_reply_error_1.NEW_REPLY_ERROR.MISSING_PROPERTY,
    invalid_type_error: new_reply_error_1.NEW_REPLY_ERROR.INVALID_DATA_TYPE,
});
class NewReply {
    constructor(payload) {
        const result = NewReplyPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { content, owner, threadId, commentId } = result.data;
        this.content = content;
        this.owner = owner;
        this.threadId = threadId;
        this.commentId = commentId;
    }
}
exports.NewReply = NewReply;
