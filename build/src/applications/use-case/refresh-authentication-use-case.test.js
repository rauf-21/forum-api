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
const refresh_authentication_use_case_error_1 = require("../../commons/constants/applications/use-case/refresh-authentication-use-case-error");
const refresh_authentication_use_case_1 = require("./refresh-authentication-use-case");
describe("RefreshAuthenticationUseCase", () => {
    it("should orchestrate the refresh authentication action correctly", async () => {
        const useCasePayload = {
            refreshToken: "refresh_token",
        };
        const mockAuthenticationRepository = jme.mock();
        mockAuthenticationRepository.verifyTokenIsExists.mockResolvedValue(undefined);
        const mockAuthenticationTokenManager = jme.mock();
        mockAuthenticationTokenManager.verifyRefreshToken.mockResolvedValue(undefined);
        mockAuthenticationTokenManager.decodePayload.mockResolvedValue({
            id: "user-123",
            username: "bono",
        });
        mockAuthenticationTokenManager.createAccessToken.mockResolvedValue("access_token");
        const refreshAuthenticationUseCase = new refresh_authentication_use_case_1.RefreshAuthenticationUseCase({
            authenticationRepository: mockAuthenticationRepository,
            authenticationTokenManager: mockAuthenticationTokenManager,
        });
        const accessToken = await refreshAuthenticationUseCase.execute(useCasePayload);
        expect(mockAuthenticationTokenManager.verifyRefreshToken).toHaveBeenCalledWith(useCasePayload.refreshToken);
        expect(mockAuthenticationRepository.verifyTokenIsExists).toHaveBeenCalledWith(useCasePayload.refreshToken);
        expect(mockAuthenticationTokenManager.decodePayload).toHaveBeenCalledWith(useCasePayload.refreshToken);
        expect(mockAuthenticationTokenManager.createAccessToken).toHaveBeenCalledWith({
            id: "user-123",
            username: "bono",
        });
        expect(accessToken).toEqual("access_token");
    });
    it("should throw an error if the payload does not contain a refresh token", async () => {
        const refreshAuthenticationUseCase = new refresh_authentication_use_case_1.RefreshAuthenticationUseCase({});
        await expect(refreshAuthenticationUseCase.execute({})).rejects.toThrow(refresh_authentication_use_case_error_1.REFRESH_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN);
    });
    it("should throw an error if the refresh token is not string", async () => {
        const useCasePayload = {
            refreshToken: 1,
        };
        const refreshAuthenticationUseCase = new refresh_authentication_use_case_1.RefreshAuthenticationUseCase({});
        await expect(refreshAuthenticationUseCase.execute(useCasePayload)).rejects.toThrow(refresh_authentication_use_case_error_1.REFRESH_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE);
    });
});
