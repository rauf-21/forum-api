import { z } from "zod";

import { ADDED_REPLY_ERROR } from "../../../commons/constants/domains/replies/added-reply-error";

const AddedReplyPayloadSchema = z.object({
  id: z.string({
    required_error: ADDED_REPLY_ERROR.MISSING_PROPERTY,
    invalid_type_error: ADDED_REPLY_ERROR.INVALID_DATA_TYPE,
  }),
  content: z.string({
    required_error: ADDED_REPLY_ERROR.MISSING_PROPERTY,
    invalid_type_error: ADDED_REPLY_ERROR.INVALID_DATA_TYPE,
  }),
  owner: z.string({
    required_error: ADDED_REPLY_ERROR.MISSING_PROPERTY,
    invalid_type_error: ADDED_REPLY_ERROR.INVALID_DATA_TYPE,
  }),
});

export class AddedReply {
  readonly id: string;

  readonly content: string;

  readonly owner: string;

  constructor(payload: unknown) {
    const result = AddedReplyPayloadSchema.safeParse(payload);

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
