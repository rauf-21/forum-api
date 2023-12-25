"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_error_1 = require("./client-error");
describe("ClientError", () => {
    it("should throw an error if it is directly instantiated", () => {
        // @ts-expect-error create an instance of an abstract class
        expect(() => new client_error_1.ClientError("")).toThrow("cannot instantiate abstract class");
    });
});
