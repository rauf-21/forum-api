"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_error_1 = require("./authorization-error");
const client_error_1 = require("./client-error");
describe("AuthorizationError", () => {
    it("should create the correctly", () => {
        const errorMessage = "authorization error!";
        const authenticationError = new authorization_error_1.AuthorizationError(errorMessage);
        expect(authenticationError).toBeInstanceOf(authorization_error_1.AuthorizationError);
        expect(authenticationError).toBeInstanceOf(client_error_1.ClientError);
        expect(authenticationError).toBeInstanceOf(Error);
        expect(authenticationError.statusCode).toEqual(403);
        expect(authenticationError.message).toEqual(errorMessage);
        expect(authenticationError.name).toEqual("AuthorizationError");
    });
});
