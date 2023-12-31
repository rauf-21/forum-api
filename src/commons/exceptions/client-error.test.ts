import { ClientError } from "./client-error";

describe("ClientError", () => {
  it("should throw an error if it is directly instantiated", () => {
    // @ts-expect-error create an instance of an abstract class
    expect(() => new ClientError("")).toThrow(
      "cannot instantiate abstract class"
    );
  });
});
