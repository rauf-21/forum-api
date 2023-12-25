"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadDetail = void 0;
const zod_1 = require("zod");
const thread_detail_error_1 = require("../../../commons/constants/domains/threads/thread-detail-error");
const CommentReplyPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
    }),
    username: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
    }),
    date: zod_1.z
        .date({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
    })
        .or(zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
    })),
    content: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
    }),
});
const ThreadCommentPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
    }),
    username: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
    }),
    date: zod_1.z
        .date({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
    })
        .or(zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
    })),
    content: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
    }),
    likeCount: zod_1.z.number({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
    }),
    replies: zod_1.z.array(CommentReplyPayloadSchema),
});
const ThreadDetailPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
    }),
    title: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
    }),
    body: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
    }),
    date: zod_1.z
        .date({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
    })
        .or(zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
    })),
    username: zod_1.z.string({
        required_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
        invalid_type_error: thread_detail_error_1.THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
    }),
    comments: zod_1.z.array(ThreadCommentPayloadSchema),
});
class ThreadDetail {
    constructor(payload) {
        const result = ThreadDetailPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { id, title, body, date, username, comments } = result.data;
        this.id = id;
        this.title = title;
        this.body = body;
        this.date = date;
        this.username = username;
        this.comments = comments;
    }
}
exports.ThreadDetail = ThreadDetail;
