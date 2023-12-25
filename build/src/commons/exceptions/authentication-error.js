"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const client_error_1 = require("./client-error");
class AuthenticationError extends client_error_1.ClientError {
    constructor(message) {
        super(message, 401);
        this.name = "AuthenticationError";
    }
}
exports.AuthenticationError = AuthenticationError;
