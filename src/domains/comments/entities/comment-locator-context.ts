import { z } from "zod";

import { COMMENT_LOCATOR_CONTEXT_ERROR } from "../../../commons/constants/domains/comments/comment-locator-context-error";

const CommentLocatorContextPayloadSchema = z.object({
  id: z.string({
    required_error: COMMENT_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY,
    invalid_type_error: COMMENT_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE,
  }),
  threadId: z.string({
    required_error: COMMENT_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY,
    invalid_type_error: COMMENT_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE,
  }),
});

export class CommentLocatorContext {
  readonly id: string;

  readonly threadId: string;

  constructor(payload: unknown) {
    const result = CommentLocatorContextPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMesssage = result.error.issues[0].message;

      throw new Error(errorMesssage);
    }

    const { id, threadId } = result.data;

    this.id = id;
    this.threadId = threadId;
  }
}
