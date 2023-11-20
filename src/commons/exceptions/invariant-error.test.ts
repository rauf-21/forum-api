import { ClientError } from "./client-error";
import { InvariantError } from "./invariant-error";

describe("InvariantError", () => {
  it("should create the error correctly", () => {
    const errorMessage = '"an error occurs"';

    const invariantError = new InvariantError(errorMessage);

    expect(invariantError).toBeInstanceOf(InvariantError);
    expect(invariantError).toBeInstanceOf(ClientError);
    expect(invariantError).toBeInstanceOf(Error);
    expect(invariantError.statusCode).toEqual(400);
    expect(invariantError.message).toEqual(errorMessage);
    expect(invariantError.name).toEqual("InvariantError");
  });
});
