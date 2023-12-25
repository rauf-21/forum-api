"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedComment = void 0;
const zod_1 = require("zod");
const added_comment_error_1 = require("../../../commons/constants/domains/comments/added-comment-error");
const AddedCommentPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: added_comment_error_1.ADDED_COMMENT_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_comment_error_1.ADDED_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
    content: zod_1.z.string({
        required_error: added_comment_error_1.ADDED_COMMENT_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_comment_error_1.ADDED_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: added_comment_error_1.ADDED_COMMENT_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_comment_error_1.ADDED_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
});
class AddedComment {
    constructor(payload) {
        const result = AddedCommentPayloadSchema.safeParse(payload);
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
exports.AddedComment = AddedComment;
