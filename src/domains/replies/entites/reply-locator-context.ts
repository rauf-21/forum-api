import { z } from "zod";

import { REPLY_LOCATOR_CONTEXT_ERROR } from "../../../commons/constants/domains/replies/reply-locator-context-error";

const ReplyLocatorContextPayloadSchema = z.object({
  id: z.string({
    required_error: REPLY_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY,
    invalid_type_error: REPLY_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE,
  }),
  commentId: z.string({
    required_error: REPLY_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY,
    invalid_type_error: REPLY_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE,
  }),
});

export class ReplyLocatorContext {
  readonly id: string;

  readonly commentId: string;

  constructor(payload: unknown) {
    const result = ReplyLocatorContextPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { id, commentId } = result.data;

    this.id = id;
    this.commentId = commentId;
  }
}
