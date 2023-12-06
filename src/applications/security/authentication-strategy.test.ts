import { AuthenticationStrategy } from "./authentication-strategy";

describe("AuthenticationStrategy", () => {
  it("should throw an error if it is directly instantiated", () => {
    // @ts-expect-error create an instance of an abstract class
    expect(() => new AuthenticationStrategy("", "", {})).toThrow(
      "cannot instantiate abstract class"
    );
  });
});
