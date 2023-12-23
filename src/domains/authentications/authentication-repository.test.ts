import { AUTHENTICATION_REPOSITORY_ERROR } from "../../commons/constants/domains/authentications/authentication-repository-error";
import { AuthenticationRepository } from "./authentication-repository";

describe("AuthenticationRepository", () => {
  it("should throw an error if an unimplemented method is called", async () => {
    const authenticationRepository =
      // @ts-expect-error create an instance of an abstract class
      new AuthenticationRepository() as AuthenticationRepository;

    await expect(authenticationRepository.addToken("")).rejects.toThrow(
      AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(
      authenticationRepository.verifyTokenIsExists("")
    ).rejects.toThrow(AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    await expect(authenticationRepository.deleteToken("")).rejects.toThrow(
      AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    expect(true).toEqual(false);
  });
});
