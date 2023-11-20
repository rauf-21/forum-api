import { z } from "zod";

import { NEW_THREAD_ERROR } from "../../../commons/constants/domains/threads/new-thread-error";

const NewThreadPayloadSchema = z.object(
  {
    title: z.string({
      required_error: NEW_THREAD_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
    body: z.string({
      required_error: NEW_THREAD_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
    owner: z.string({
      required_error: NEW_THREAD_ERROR.MISSING_PROPERTY,
      invalid_type_error: NEW_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
  },
  {
    required_error: NEW_THREAD_ERROR.MISSING_PROPERTY,
    invalid_type_error: NEW_THREAD_ERROR.INVALID_DATA_TYPE,
  }
);

export class NewThread {
  readonly title: string;

  readonly body: string;

  readonly owner: string;

  constructor(payload: unknown) {
    const result = NewThreadPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { title, body, owner } = result.data;

    this.title = title;
    this.body = body;
    this.owner = owner;
  }
}
