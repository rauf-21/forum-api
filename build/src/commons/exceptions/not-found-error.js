"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const client_error_1 = require("./client-error");
class NotFoundError extends client_error_1.ClientError {
    constructor(message) {
        super(message, 404);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
