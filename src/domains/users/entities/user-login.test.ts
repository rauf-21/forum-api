import { USER_LOGIN_ERROR } from "../../../commons/constants/domains/users/user-login-error";
import { UserLogin } from "./user-login";

describe("UserLogin entities", () => {
  it("should be able to create the userLogin object correctly", () => {
    const payload = {
      username: "dicoding",
      password: "12345",
    };

    const userLogin = new UserLogin(payload);

    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);
  });

  it("should throw an error if there is a missing property", () => {
    const payload = {};

    expect(() => new UserLogin(payload)).toThrow(
      USER_LOGIN_ERROR.MISSING_PROPERTY
    );
  });

  it("should throw an error if there is a property with an invalid data type", () => {
    const payload = {
      username: 123,
    };

    expect(() => new UserLogin(payload)).toThrow(
      USER_LOGIN_ERROR.INVALID_DATA_TYPE
    );
  });
});
