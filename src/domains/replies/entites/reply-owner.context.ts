import { z } from "zod";

import { REPLY_OWNER_CONTEXT_ERROR } from "../../../commons/constants/domains/replies/reply-owner-context-error";

const ReplyOwnerContextPayloadSchema = z.object({
  id: z.string({
    required_error: REPLY_OWNER_CONTEXT_ERROR.MISSING_PROPERTY,
    invalid_type_error: REPLY_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE,
  }),
  owner: z.string({
    required_error: REPLY_OWNER_CONTEXT_ERROR.MISSING_PROPERTY,
    invalid_type_error: REPLY_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE,
  }),
});

export class ReplyOwnerContext {
  readonly id: string;

  readonly owner: string;

  constructor(payload: unknown) {
    const result = ReplyOwnerContextPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { id, owner } = result.data;

    this.id = id;
    this.owner = owner;
  }
}
