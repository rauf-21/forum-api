import { HapiJwt } from "@hapi/jwt";

import { AuthenticationTokenManager } from "../../applications/security/authentication-token-manager";
import { AUTHENTICATION_TOKEN_MANAGER_ERROR } from "../../commons/constants/applications/security/authentication-token-manager-error";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../../commons/constants/infrastructures/token";

export class TokenManagerJwt extends AuthenticationTokenManager {
  readonly #jwtToken: HapiJwt.Token;

  constructor(jwtToken: HapiJwt.Token) {
    super();

    this.#jwtToken = jwtToken;
  }

  async createAccessToken(payload: HapiJwt.Payload) {
    return this.#jwtToken.generate(payload, ACCESS_TOKEN_SECRET);
  }

  async createRefreshToken(payload: HapiJwt.Payload) {
    return this.#jwtToken.generate(payload, REFRESH_TOKEN_SECRET);
  }

  async verifyRefreshToken(token: string) {
    try {
      const artifacts = this.#jwtToken.decode(token);

      this.#jwtToken.verify(artifacts, REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Error(AUTHENTICATION_TOKEN_MANAGER_ERROR.INVALID_REFRESH_TOKEN);
    }
  }

  decodePayload(token: string) {
    const artifacts = this.#jwtToken.decode(token);

    return artifacts.decoded.payload;
  }
}
