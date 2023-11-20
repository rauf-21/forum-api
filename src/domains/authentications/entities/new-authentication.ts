import { z } from "zod";

import { NEW_AUTHENTICATION_ERROR } from "../../../commons/constants/domains/authentications/new-authentication-error";

const NewAuthenticationPayloadSchema = z.object({
  accessToken: z.string({
    required_error: NEW_AUTHENTICATION_ERROR.MISSING_PROPERTY,
    invalid_type_error: NEW_AUTHENTICATION_ERROR.INVALID_DATA_TYPE,
  }),
  refreshToken: z.string({
    required_error: NEW_AUTHENTICATION_ERROR.MISSING_PROPERTY,
    invalid_type_error: NEW_AUTHENTICATION_ERROR.INVALID_DATA_TYPE,
  }),
});

export class NewAuthentication {
  readonly accessToken: string;

  readonly refreshToken: string;

  constructor(payload: unknown) {
    const result = NewAuthenticationPayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { accessToken, refreshToken } = result.data;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
