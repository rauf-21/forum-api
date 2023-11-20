import { z } from "zod";

import { ADDED_THREAD_ERROR } from "../../../commons/constants/domains/threads/added-thread-error";

const AddedThreadPayloadSchema = z.object({
  id: z.string({
    required_error: ADDED_THREAD_ERROR.MISSING_PROPERTY,
    invalid_type_error: ADDED_THREAD_ERROR.INVALID_DATA_TYPE,
  }),
  title: z.string({
    required_error: ADDED_THREAD_ERROR.MISSING_PROPERTY,
    invalid_type_error: ADDED_THREAD_ERROR.INVALID_DATA_TYPE,
  }),
  owner: z.string({
    required_error: ADDED_THREAD_ERROR.MISSING_PROPERTY,
    invalid_type_error: ADDED_THREAD_ERROR.INVALID_DATA_TYPE,
  }),
});

export class AddedThread {
  readonly id: string;

  readonly title: string;

  readonly owner: string;

  constructor(payload: unknown) {
    const result = AddedThreadPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { id, title, owner } = result.data;

    this.id = id;
    this.title = title;
    this.owner = owner;
  }
}
