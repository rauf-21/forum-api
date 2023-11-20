import { HapiJwt } from "@hapi/jwt";

import { AuthenticationStrategy } from "../../applications/security/authentication-strategy";
import {
  ACCESS_TOKEN_AGE,
  ACCESS_TOKEN_SECRET,
} from "../../commons/constants/infrastructures/token";

export class AuthenticationStrategyJwt implements AuthenticationStrategy {
  readonly name: string;

  readonly scheme = "jwt";

  readonly options: HapiJwt.Options;

  constructor(name: string) {
    this.name = name;
    this.options = {
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
    };
  }
}
