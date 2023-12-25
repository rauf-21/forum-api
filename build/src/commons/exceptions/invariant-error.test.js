"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_error_1 = require("./client-error");
const invariant_error_1 = require("./invariant-error");
describe("InvariantError", () => {
    it("should create the error correctly", () => {
        const errorMessage = '"an error occurs"';
        const invariantError = new invariant_error_1.InvariantError(errorMessage);
        expect(invariantError).toBeInstanceOf(invariant_error_1.InvariantError);
        expect(invariantError).toBeInstanceOf(client_error_1.ClientError);
        expect(invariantError).toBeInstanceOf(Error);
        expect(invariantError.statusCode).toEqual(400);
        expect(invariantError.message).toEqual(errorMessage);
        expect(invariantError.name).toEqual("InvariantError");
    });
});
