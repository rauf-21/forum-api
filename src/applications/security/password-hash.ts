/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { PASSWORD_HASH_ERROR } from "../../commons/constants/applications/security/password-hash-error";

export abstract class PasswordHash {
  async hash(plainPassword: string): Promise<string> {
    throw new Error(PASSWORD_HASH_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<void> {
    throw new Error(PASSWORD_HASH_ERROR.METHOD_NOT_IMPLEMENTED);
  }
}
