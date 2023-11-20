import { AuthorizationError } from "./authorization-error";
import { ClientError } from "./client-error";

describe("AuthorizationError", () => {
  it("should create the correctly", () => {
    const errorMessage = "authorization error!";

    const authenticationError = new AuthorizationError(errorMessage);

    expect(authenticationError).toBeInstanceOf(AuthorizationError);
    expect(authenticationError).toBeInstanceOf(ClientError);
    expect(authenticationError).toBeInstanceOf(Error);
    expect(authenticationError.statusCode).toEqual(403);
    expect(authenticationError.message).toEqual(errorMessage);
    expect(authenticationError.name).toEqual("AuthorizationError");
  });
});
