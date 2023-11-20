import { z } from "zod";

import { REGISTERED_USER_ERROR } from "../../../commons/constants/domains/users/registered-user-error";

const RegisteredUserPayloadSchema = z.object({
  id: z.string({
    required_error: REGISTERED_USER_ERROR.MISSING_PROPERTY,
    invalid_type_error: REGISTERED_USER_ERROR.INVALID_DATA_TYPE,
  }),
  username: z.string({
    required_error: REGISTERED_USER_ERROR.MISSING_PROPERTY,
    invalid_type_error: REGISTERED_USER_ERROR.INVALID_DATA_TYPE,
  }),
  fullname: z.string({
    required_error: REGISTERED_USER_ERROR.MISSING_PROPERTY,
    invalid_type_error: REGISTERED_USER_ERROR.INVALID_DATA_TYPE,
  }),
});

export class RegisteredUser {
  readonly id: string;

  readonly username: string;

  readonly fullname: string;

  constructor(payload: unknown) {
    const result = RegisteredUserPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { id, username, fullname } = result.data;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }
}
