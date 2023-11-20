import { z } from "zod";

import { NEW_COMMENT_ERROR } from "../../../commons/constants/domains/comments/new-comment-error";

const NewCommentPayloadSchema = z.object(
  {
    content: z.string({
      required_error: NEW_COMMENT_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
    owner: z.string({
      required_error: NEW_COMMENT_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
    threadId: z.string({
      required_error: NEW_COMMENT_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_COMMENT_ERROR.INVALID_DATA_TYPE,
    }),
  },
  {
    required_error: NEW_COMMENT_ERROR.MISSING_PROPERTY,
    invalid_type_error: NEW_COMMENT_ERROR.INVALID_DATA_TYPE,
  }
);

export class NewComment {
  readonly content: string;

  readonly owner: string;

  readonly threadId: string;

  constructor(payload: unknown) {
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
