"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_repository_error_1 = require("../../commons/constants/domains/authentications/authentication-repository-error");
const authentication_repository_1 = require("./authentication-repository");
describe("AuthenticationRepository", () => {
    it("should throw an error if an unimplemented method is called", async () => {
        const authenticationRepository = 
        // @ts-expect-error create an instance of an abstract class
        new authentication_repository_1.AuthenticationRepository();
        await expect(authenticationRepository.addToken("")).rejects.toThrow(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(authenticationRepository.verifyTokenIsExists("")).rejects.toThrow(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(authenticationRepository.deleteToken("")).rejects.toThrow(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    });
});
