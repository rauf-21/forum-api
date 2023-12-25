"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ClientError";
        if (this.constructor.name === "ClientError") {
            throw new Error("cannot instantiate abstract class");
        }
    }
}
exports.ClientError = ClientError;
