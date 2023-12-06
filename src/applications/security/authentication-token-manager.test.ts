import { AUTHENTICATION_TOKEN_MANAGER_ERROR } from "../../commons/constants/applications/security/authentication-token-manager-error";
import { AuthenticationTokenManager } from "./authentication-token-manager";

describe("AuthenticationTokenManager", () => {
  it("should throw an error if an unimplemented method is called", async () => {
    const authenticationTokenManager =
      // @ts-expect-error create an instance of an abstract class
      new AuthenticationTokenManager() as AuthenticationTokenManager;

    await expect(
      authenticationTokenManager.createRefreshToken({})
    ).rejects.toThrow(
      AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(
      authenticationTokenManager.createAccessToken({})
    ).rejects.toThrow(
      AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(
      authenticationTokenManager.verifyRefreshToken("")
    ).rejects.toThrow(
      AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(authenticationTokenManager.decodePayload("")).rejects.toThrow(
      AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED
    );
  });
});
