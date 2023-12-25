"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_error_1 = require("./client-error");
const not_found_error_1 = require("./not-found-error");
describe("NotFoundError", () => {
    it("should create error correctly", () => {
        const errorMessage = "not found!";
        const notFoundError = new not_found_error_1.NotFoundError(errorMessage);
        expect(notFoundError).toBeInstanceOf(not_found_error_1.NotFoundError);
        expect(notFoundError).toBeInstanceOf(client_error_1.ClientError);
        expect(notFoundError).toBeInstanceOf(Error);
        expect(notFoundError.message).toEqual(errorMessage);
        expect(notFoundError.statusCode).toEqual(404);
        expect(notFoundError.name).toEqual("NotFoundError");
    });
});
