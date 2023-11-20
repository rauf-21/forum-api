import { NEW_AUTHENTICATION_ERROR } from "../../../commons/constants/domains/authentications/new-authentication-error";
import { NewAuthentication } from "./new-authentication";

describe("NewAuth entities", () => {
  it("should be able to create the newAuth object correctly", () => {
    const payload = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };

    const newAuth = new NewAuthentication(payload);

    expect(newAuth).toBeInstanceOf(NewAuthentication);
    expect(newAuth.accessToken).toEqual(payload.accessToken);
    expect(newAuth.refreshToken).toEqual(payload.refreshToken);
  });

  it("should throw an error if there is a missing property", () => {
    const payload = {};

    expect(() => new NewAuthentication(payload)).toThrow(
      NEW_AUTHENTICATION_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", () => {
    const payload = {
      accessToken: 123,
    };

    expect(() => new NewAuthentication(payload)).toThrow(
      NEW_AUTHENTICATION_ERROR.INVALID_DATA_TYPE
    );
  });
});
