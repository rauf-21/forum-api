"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewComment = void 0;
const zod_1 = require("zod");
const new_comment_error_1 = require("../../../commons/constants/domains/comments/new-comment-error");
const NewCommentPayloadSchema = zod_1.z.object({
    content: zod_1.z.string({
        required_error: new_comment_error_1.NEW_COMMENT_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_comment_error_1.NEW_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: new_comment_error_1.NEW_COMMENT_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_comment_error_1.NEW_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
    threadId: zod_1.z.string({
        required_error: new_comment_error_1.NEW_COMMENT_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_comment_error_1.NEW_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
}, {
    required_error: new_comment_error_1.NEW_COMMENT_ERROR.MISSING_PROPERTY,
    invalid_type_error: new_comment_error_1.NEW_COMMENT_ERROR.INVALID_DATA_TYPE,
});
class NewComment {
    constructor(payload) {
        const result = NewCommentPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { content, owner, threadId } = result.data;
        this.content = content;
        this.owner = owner;
        this.threadId = threadId;
    }
}
exports.NewComment = NewComment;
