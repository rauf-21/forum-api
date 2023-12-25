"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_error_1 = require("./authentication-error");
const client_error_1 = require("./client-error");
describe("AuthenticationError", () => {
    it("should create the error correctly", () => {
        const errorMessage = "authentication error!";
        const authenticationError = new authentication_error_1.AuthenticationError(errorMessage);
        expect(authenticationError).toBeInstanceOf(authentication_error_1.AuthenticationError);
        expect(authenticationError).toBeInstanceOf(client_error_1.ClientError);
        expect(authenticationError).toBeInstanceOf(Error);
        expect(authenticationError.statusCode).toEqual(401);
        expect(authenticationError.message).toEqual(errorMessage);
        expect(authenticationError.name).toEqual("AuthenticationError");
    });
});
