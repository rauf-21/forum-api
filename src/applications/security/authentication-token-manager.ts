/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { HapiJwt } from "@hapi/jwt";

import { AUTHENTICATION_TOKEN_MANAGER_ERROR } from "../../commons/constants/applications/security/authentication-token-manager-error";

export abstract class AuthenticationTokenManager {
  async createRefreshToken(payload: HapiJwt.Payload): Promise<string> {
    throw new Error(AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async createAccessToken(payload: HapiJwt.Payload): Promise<string> {
    throw new Error(AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyRefreshToken(token: string): Promise<void> {
    throw new Error(AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async decodePayload(token: string): Promise<HapiJwt.Payload> {
    throw new Error(AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
  }
}
