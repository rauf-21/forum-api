"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRepository = void 0;
const authentication_repository_error_1 = require("../../commons/constants/domains/authentications/authentication-repository-error");
class AuthenticationRepository {
    async addToken(token) {
        throw new Error(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyTokenIsExists(token) {
        throw new Error(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async deleteToken(token) {
        throw new Error(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
}
exports.AuthenticationRepository = AuthenticationRepository;
