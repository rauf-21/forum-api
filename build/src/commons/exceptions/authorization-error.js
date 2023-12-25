"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = void 0;
const client_error_1 = require("./client-error");
class AuthorizationError extends client_error_1.ClientError {
    constructor(message) {
        super(message, 403);
        this.name = "AuthorizationError";
    }
}
exports.AuthorizationError = AuthorizationError;
