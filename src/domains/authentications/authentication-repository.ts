/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { AUTHENTICATION_REPOSITORY_ERROR } from "../../commons/constants/domains/authentications/authentication-repository-error";

export abstract class AuthenticationRepository {
  async addToken(token: string): Promise<void> {
    throw new Error(AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyTokenIsExists(token: string): Promise<void> {
    throw new Error(AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async deleteToken(token: string): Promise<void> {
    throw new Error(AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }
}
