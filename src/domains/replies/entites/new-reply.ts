import { z } from "zod";

import { NEW_REPLY_ERROR } from "../../../commons/constants/domains/replies/new-reply-error";

const NewReplyPayloadSchema = z.object(
  {
    content: z.string({
      required_error: NEW_REPLY_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
    owner: z.string({
      required_error: NEW_REPLY_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
    threadId: z.string({
      required_error: NEW_REPLY_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
    commentId: z.string({
      required_error: NEW_REPLY_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_REPLY_ERROR.INVALID_DATA_TYPE,
    }),
  },
  {
    required_error: NEW_REPLY_ERROR.MISSING_PROPERTY,
    invalid_type_error: NEW_REPLY_ERROR.INVALID_DATA_TYPE,
  }
);

export class NewReply {
  readonly content: string;

  readonly owner: string;

  readonly threadId: string;

  readonly commentId: string;

  constructor(payload: unknown) {
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
