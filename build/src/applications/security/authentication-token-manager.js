"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationTokenManager = void 0;
const authentication_token_manager_error_1 = require("../../commons/constants/applications/security/authentication-token-manager-error");
class AuthenticationTokenManager {
    async createRefreshToken(payload) {
        throw new Error(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async createAccessToken(payload) {
        throw new Error(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyRefreshToken(token) {
        throw new Error(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async decodePayload(token) {
        throw new Error(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
    }
}
exports.AuthenticationTokenManager = AuthenticationTokenManager;
