"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jme = __importStar(require("jest-mock-extended"));
const new_authentication_1 = require("../../domains/authentications/entities/new-authentication");
const login_user_use_case_1 = require("./login-user-use-case");
describe("LoginUserUseCase", () => {
    it("should orchestrate the get authentication action correctly", async () => {
        const useCasePayload = {
            username: "bono",
            password: "plain_password",
        };
        const mockUserRepository = jme.mock();
        mockUserRepository.getUserByUsername.mockResolvedValue({
            id: "user-123",
            password: "hashed_password",
            username: "bono",
            fullname: "bono bono",
        });
        const mockAuthenticationRepository = jme.mock();
        mockAuthenticationRepository.addToken.mockResolvedValue(undefined);
        const mockAuthenticationTokenManager = jme.mock();
        mockAuthenticationTokenManager.createAccessToken.mockResolvedValue("access_token");
        mockAuthenticationTokenManager.createRefreshToken.mockResolvedValue("refresh_token");
        const mockPasswordHash = jme.mock();
        mockPasswordHash.verifyPassword.mockResolvedValue(undefined);
        const loginUserUseCase = new login_user_use_case_1.LoginUserUseCase({
            userRepository: mockUserRepository,
            authenticationRepository: mockAuthenticationRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
            passwordHash: mockPasswordHash,
        });
        const authentication = await loginUserUseCase.execute(useCasePayload);
        expect(authentication).toEqual(new new_authentication_1.NewAuthentication({
            accessToken: "access_token",
            refreshToken: "refresh_token",
        }));
        expect(mockUserRepository.getUserByUsername).toHaveBeenCalledWith("bono");
        expect(mockPasswordHash.verifyPassword).toHaveBeenCalledWith("plain_password", "hashed_password");
        expect(mockAuthenticationTokenManager.createAccessToken).toHaveBeenCalledWith({
            id: "user-123",
            username: "bono",
        });
        expect(mockAuthenticationTokenManager.createRefreshToken).toHaveBeenCalledWith({
            id: "user-123",
            username: "bono",
        });
        expect(mockAuthenticationRepository.addToken).toHaveBeenCalledWith("refresh_token");
    });
});
