import { PASSWORD_HASH_ERROR } from "../../commons/constants/applications/security/password-hash-error";
import { PasswordHash } from "./password-hash";

describe("PasswordHash", () => {
  it("should throw an error if an unimplemented method is called", async () => {
    // @ts-expect-error create an instance of an abstract class
    const passwordHash = new PasswordHash() as PasswordHash;

    await expect(passwordHash.hash("plain")).rejects.toThrow(
      PASSWORD_HASH_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(
      passwordHash.verifyPassword("plain", "hashed")
    ).rejects.toThrow(PASSWORD_HASH_ERROR.METHOD_NOT_IMPLEMENTED);
  });
});
