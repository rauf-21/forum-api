"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_login_error_1 = require("../../../commons/constants/domains/users/user-login-error");
const user_login_1 = require("./user-login");
describe("UserLogin entities", () => {
    it("should be able to create the userLogin object correctly", () => {
        const payload = {
            username: "dicoding",
            password: "12345",
        };
        const userLogin = new user_login_1.UserLogin(payload);
        expect(userLogin).toBeInstanceOf(user_login_1.UserLogin);
        expect(userLogin.username).toEqual(payload.username);
        expect(userLogin.password).toEqual(payload.password);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new user_login_1.UserLogin(payload)).toThrow(user_login_error_1.USER_LOGIN_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            username: 123,
        };
        expect(() => new user_login_1.UserLogin(payload)).toThrow(user_login_error_1.USER_LOGIN_ERROR.INVALID_DATA_TYPE);
    });
});
