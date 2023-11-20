import { z } from "zod";

import { REGISTER_USER_ERROR } from "../../../commons/constants/domains/users/register-user-error";

const RegisterUserPayload = z.object({
  username: z
    .string({
      required_error: REGISTER_USER_ERROR.MISSING_PROPERTY,
      invalid_type_error: REGISTER_USER_ERROR.INVALID_DATA_TYPE,
    })
    .refine((username) => username.length <= 50, {
      message: REGISTER_USER_ERROR.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT,
    })
    .refine((username) => username.match(/^[a-zA-Z0-9_]+$/), {
      message: REGISTER_USER_ERROR.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER,
    }),
  password: z.string({
    required_error: REGISTER_USER_ERROR.MISSING_PROPERTY,
    invalid_type_error: REGISTER_USER_ERROR.INVALID_DATA_TYPE,
  }),
  fullname: z.string({
    required_error: REGISTER_USER_ERROR.MISSING_PROPERTY,
    invalid_type_error: REGISTER_USER_ERROR.INVALID_DATA_TYPE,
  }),
});

export class RegisterUser {
  readonly username: string;

  readonly password: string;

  readonly fullname: string;

  constructor(payload: unknown) {
    const result = RegisterUserPayload.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { username, password, fullname } = result.data;

    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }
}
