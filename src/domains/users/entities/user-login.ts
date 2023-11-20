import { z } from "zod";

import { USER_LOGIN_ERROR } from "../../../commons/constants/domains/users/user-login-error";

const UserLoginPayloadSchema = z.object({
  username: z.string({
    required_error: USER_LOGIN_ERROR.MISSING_PROPERTY,
    invalid_type_error: USER_LOGIN_ERROR.INVALID_DATA_TYPE,
  }),
  password: z.string({
    required_error: USER_LOGIN_ERROR.MISSING_PROPERTY,
    invalid_type_error: USER_LOGIN_ERROR.INVALID_DATA_TYPE,
  }),
});

export class UserLogin {
  readonly username: string;

  readonly password: string;

  constructor(payload: unknown) {
    const result = UserLoginPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { username, password } = result.data;

    this.username = username;
    this.password = password;
  }
}
