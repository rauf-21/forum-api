import { ClientError } from "./client-error";

describe("ClientError", () => {
  it("should throw an error when instantiating it directly", () => {
    // @ts-expect-error instantiating an abstract class should trigger an error
    expect(() => new ClientError("")).toThrow(
      "cannot instantiate abstract class"
    );
  });
});
