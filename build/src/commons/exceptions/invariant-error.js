"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvariantError = void 0;
const client_error_1 = require("./client-error");
class InvariantError extends client_error_1.ClientError {
    constructor() {
        super(...arguments);
        this.name = "InvariantError";
    }
}
exports.InvariantError = InvariantError;
