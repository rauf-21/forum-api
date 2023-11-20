import { ClientError } from "./client-error";
import { NotFoundError } from "./not-found-error";

describe("NotFoundError", () => {
  it("should create error correctly", () => {
    const errorMessage = "not found!";

    const notFoundError = new NotFoundError(errorMessage);

    expect(notFoundError).toBeInstanceOf(NotFoundError);
    expect(notFoundError).toBeInstanceOf(ClientError);
    expect(notFoundError).toBeInstanceOf(Error);
    expect(notFoundError.message).toEqual(errorMessage);
    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.name).toEqual("NotFoundError");
  });
});
