"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_token_manager_error_1 = require("../../commons/constants/applications/security/authentication-token-manager-error");
const authentication_token_manager_1 = require("./authentication-token-manager");
describe("AuthenticationTokenManager", () => {
    it("should throw an error if an unimplemented method is called", async () => {
        const authenticationTokenManager = 
        // @ts-expect-error create an instance of an abstract class
        new authentication_token_manager_1.AuthenticationTokenManager();
        await expect(authenticationTokenManager.createRefreshToken({})).rejects.toThrow(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(authenticationTokenManager.createAccessToken({})).rejects.toThrow(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(authenticationTokenManager.verifyRefreshToken("")).rejects.toThrow(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(authenticationTokenManager.decodePayload("")).rejects.toThrow(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.METHOD_NOT_IMPLEMENTED);
    });
});
