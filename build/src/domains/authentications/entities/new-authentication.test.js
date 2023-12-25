"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const new_authentication_error_1 = require("../../../commons/constants/domains/authentications/new-authentication-error");
const new_authentication_1 = require("./new-authentication");
describe("NewAuth entities", () => {
    it("should be able to create the newAuth object correctly", () => {
        const payload = {
            accessToken: "accessToken",
            refreshToken: "refreshToken",
        };
        const newAuth = new new_authentication_1.NewAuthentication(payload);
        expect(newAuth).toBeInstanceOf(new_authentication_1.NewAuthentication);
        expect(newAuth.accessToken).toEqual(payload.accessToken);
        expect(newAuth.refreshToken).toEqual(payload.refreshToken);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new new_authentication_1.NewAuthentication(payload)).toThrow(new_authentication_error_1.NEW_AUTHENTICATION_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            accessToken: 123,
        };
        expect(() => new new_authentication_1.NewAuthentication(payload)).toThrow(new_authentication_error_1.NEW_AUTHENTICATION_ERROR.INVALID_DATA_TYPE);
    });
});
