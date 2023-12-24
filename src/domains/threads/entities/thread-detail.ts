import { z } from "zod";

import { THREAD_DETAIL_ERROR } from "../../../commons/constants/domains/threads/thread-detail-error";

const CommentReplyPayloadSchema = z.object({
  id: z.string({
    required_error: THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
  }),
  username: z.string({
    required_error: THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
  }),
  date: z
    .date({
      required_error: THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
      invalid_type_error: THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
    })
    .or(
      z.string({
        required_error: THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
        invalid_type_error: THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
      })
    ),
  content: z.string({
    required_error: THREAD_DETAIL_ERROR.REPLY.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.REPLY.INVALID_DATA_TYPE,
  }),
});

const ThreadCommentPayloadSchema = z.object({
  id: z.string({
    required_error: THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
  }),
  username: z.string({
    required_error: THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
  }),
  date: z
    .date({
      required_error: THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
      invalid_type_error: THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
    })
    .or(
      z.string({
        required_error: THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
        invalid_type_error: THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
      })
    ),
  content: z.string({
    required_error: THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
  }),
  likeCount: z.number({
    required_error: THREAD_DETAIL_ERROR.COMMENT.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.COMMENT.INVALID_DATA_TYPE,
  }),
  replies: z.array(CommentReplyPayloadSchema),
});

const ThreadDetailPayloadSchema = z.object({
  id: z.string({
    required_error: THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
  }),
  title: z.string({
    required_error: THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
  }),
  body: z.string({
    required_error: THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
  }),
  date: z
    .date({
      required_error: THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
      invalid_type_error: THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
    })
    .or(
      z.string({
        required_error: THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
        invalid_type_error: THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
      })
    ),
  username: z.string({
    required_error: THREAD_DETAIL_ERROR.THREAD.MISSING_PROPERTY,
    invalid_type_error: THREAD_DETAIL_ERROR.THREAD.INVALID_DATA_TYPE,
  }),
  comments: z.array(ThreadCommentPayloadSchema),
});

type Thread = z.infer<typeof ThreadDetailPayloadSchema>;

export class ThreadDetail {
  readonly id: string;

  readonly title: string;

  readonly body: string;

  readonly date: Date | string;

  readonly username: string;

  readonly comments: Thread["comments"];

  constructor(payload: unknown) {
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
