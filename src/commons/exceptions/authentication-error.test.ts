import { AuthenticationError } from "./authentication-error";
import { ClientError } from "./client-error";

describe("AuthenticationError", () => {
  it("should create the error correctly", () => {
    const errorMessage = "authentication error!";

    const authenticationError = new AuthenticationError(errorMessage);

    expect(authenticationError).toBeInstanceOf(AuthenticationError);
    expect(authenticationError).toBeInstanceOf(ClientError);
    expect(authenticationError).toBeInstanceOf(Error);
    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual(errorMessage);
    expect(authenticationError.name).toEqual("AuthenticationError");
  });
});
