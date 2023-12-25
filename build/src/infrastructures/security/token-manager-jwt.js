"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TokenManagerJwt_jwtToken;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManagerJwt = void 0;
const authentication_token_manager_1 = require("../../applications/security/authentication-token-manager");
const authentication_token_manager_error_1 = require("../../commons/constants/applications/security/authentication-token-manager-error");
const token_1 = require("../../commons/constants/infrastructures/token");
class TokenManagerJwt extends authentication_token_manager_1.AuthenticationTokenManager {
    constructor(jwtToken) {
        super();
        _TokenManagerJwt_jwtToken.set(this, void 0);
        __classPrivateFieldSet(this, _TokenManagerJwt_jwtToken, jwtToken, "f");
    }
    async createAccessToken(payload) {
        return __classPrivateFieldGet(this, _TokenManagerJwt_jwtToken, "f").generate(payload, token_1.ACCESS_TOKEN_SECRET);
    }
    async createRefreshToken(payload) {
        return __classPrivateFieldGet(this, _TokenManagerJwt_jwtToken, "f").generate(payload, token_1.REFRESH_TOKEN_SECRET);
    }
    async verifyRefreshToken(token) {
        try {
            const artifacts = __classPrivateFieldGet(this, _TokenManagerJwt_jwtToken, "f").decode(token);
            __classPrivateFieldGet(this, _TokenManagerJwt_jwtToken, "f").verify(artifacts, token_1.REFRESH_TOKEN_SECRET);
        }
        catch (error) {
            throw new Error(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.INVALID_REFRESH_TOKEN);
        }
    }
    decodePayload(token) {
        const artifacts = __classPrivateFieldGet(this, _TokenManagerJwt_jwtToken, "f").decode(token);
        return artifacts.decoded.payload;
    }
}
exports.TokenManagerJwt = TokenManagerJwt;
_TokenManagerJwt_jwtToken = new WeakMap();
