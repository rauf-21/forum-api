import { z } from "zod";

import { COMMENT_OWNER_CONTEXT_ERROR } from "../../../commons/constants/domains/comments/comment-owner-context-error";

const CommentOwnerContextPayloadSchema = z.object({
  id: z.string({
    required_error: COMMENT_OWNER_CONTEXT_ERROR.MISSING_PROPERTY,
    invalid_type_error: COMMENT_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE,
  }),
  owner: z.string({
    required_error: COMMENT_OWNER_CONTEXT_ERROR.MISSING_PROPERTY,
    invalid_type_error: COMMENT_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE,
  }),
});

export class CommentOwnerContext {
  readonly id: string;

  readonly owner: string;

  constructor(payload: unknown) {
    const result = CommentOwnerContextPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { id, owner } = result.data;

    this.id = id;
    this.owner = owner;
  }
}
