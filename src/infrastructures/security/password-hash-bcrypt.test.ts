import * as BcryptFunctions from "bcrypt";

import { PASSWORD_HASH_ERROR } from "../../commons/constants/applications/security/password-hash-error";
import { PasswordHashBcrypt } from "./password-hash-bcrypt";

/**
 * This is a workaround around this issue https://github.com/jestjs/jest/issues/11019.
 * The solution is taken from this comment https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-893763840
 */
const Bcrypt = { ...BcryptFunctions };

describe("PasswordHashBcrypt", () => {
  describe("hash method", () => {
    it("should be able to encrypt the password correctly", async () => {
      const spyHash = jest.spyOn(Bcrypt, "hash");
      const passwordHashBcrypt = new PasswordHashBcrypt(Bcrypt);

      const hashedPassword = await passwordHashBcrypt.hash("plain_password");

      expect(typeof hashedPassword).toEqual("string");
      expect(hashedPassword).not.toEqual("plain_password");
      expect(spyHash).toHaveBeenCalledWith("plain_password", 10);
    });
  });

  describe("comparePassword method", () => {
    it("should throw an error if the password does not match", async () => {
      const passwordHashBcrypt = new PasswordHashBcrypt(Bcrypt);

      await expect(
        passwordHashBcrypt.verifyPassword("plain_password", "hashed_password")
      ).rejects.toThrow(PASSWORD_HASH_ERROR.INCORRECT_CREDENTIALS);
    });

    it("should not return an error if the password matches", async () => {
      const passwordHashBcrypt = new PasswordHashBcrypt(Bcrypt);

      const plainPassword = "secret";

      const hashedPassword = await passwordHashBcrypt.hash(plainPassword);

      const result = await passwordHashBcrypt.verifyPassword(
        plainPassword,
        hashedPassword
      );

      expect(result).toEqual(undefined);
    });
  });
});
