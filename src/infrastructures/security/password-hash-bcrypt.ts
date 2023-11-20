import * as Bcrypt from "bcrypt";

import { PasswordHash } from "../../applications/security/password-hash";
import { PASSWORD_HASH_ERROR } from "../../commons/constants/applications/security/password-hash-error";

export class PasswordHashBcrypt implements PasswordHash {
  readonly #bcrypt: typeof Bcrypt;

  readonly #saltRound: number;

  constructor(bcrypt: typeof Bcrypt, saltRound = 10) {
    this.#bcrypt = bcrypt;
    this.#saltRound = saltRound;
  }

  async hash(plainPassword: string) {
    const hashedPassword = await this.#bcrypt.hash(
      plainPassword,
      this.#saltRound
    );

    return hashedPassword;
  }

  async verifyPassword(plainPassword: string, hashedPassword: string) {
    const result = await this.#bcrypt.compare(plainPassword, hashedPassword);

    if (!result) {
      throw new Error(PASSWORD_HASH_ERROR.INCORRECT_CREDENTIALS);
    }
  }
}
