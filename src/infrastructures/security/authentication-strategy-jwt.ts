import { HapiJwt } from "@hapi/jwt";

import { AuthenticationStrategy } from "../../applications/security/authentication-strategy";
import {
  ACCESS_TOKEN_AGE,
  ACCESS_TOKEN_SECRET,
} from "../../commons/constants/infrastructures/token";

export class AuthenticationStrategyJwt extends AuthenticationStrategy<
  "jwt",
  HapiJwt.Options
> {
  constructor(name: string) {
    super(name, "jwt", {
      keys: ACCESS_TOKEN_SECRET,
      verify: {
        aud: false,
        iss: false,
        sub: false,
        maxAgeSec: ACCESS_TOKEN_AGE,
      },
      validate: async (artifacts) => ({
        isValid: true,
        credentials: {
          id: artifacts.decoded.payload.id,
        },
      }),
    });
  }
}
