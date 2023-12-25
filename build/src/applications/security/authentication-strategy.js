"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationStrategy = void 0;
class AuthenticationStrategy {
    constructor(name, scheme, options) {
        this.name = name;
        this.scheme = scheme;
        this.options = options;
        if (this.constructor.name === "AuthenticationStrategy") {
            throw new Error("cannot instantiate abstract class");
        }
    }
}
exports.AuthenticationStrategy = AuthenticationStrategy;
