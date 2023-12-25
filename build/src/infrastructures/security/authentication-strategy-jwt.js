"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationStrategyJwt = void 0;
const authentication_strategy_1 = require("../../applications/security/authentication-strategy");
const token_1 = require("../../commons/constants/infrastructures/token");
class AuthenticationStrategyJwt extends authentication_strategy_1.AuthenticationStrategy {
    constructor(name) {
        super(name, "jwt", {
            keys: token_1.ACCESS_TOKEN_SECRET,
            verify: {
                aud: false,
                iss: false,
                sub: false,
                maxAgeSec: token_1.ACCESS_TOKEN_AGE,
            },
            validate: async (artifacts) => ({
                isValid: true,
                credentials: {
                    id: artifacts.decoded.payload.id,
                },
            }),
        });
    }
}
exports.AuthenticationStrategyJwt = AuthenticationStrategyJwt;
