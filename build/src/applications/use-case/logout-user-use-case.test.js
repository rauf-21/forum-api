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
const delete_authentication_use_case_error_1 = require("../../commons/constants/applications/use-case/delete-authentication-use-case-error");
const logout_user_use_case_1 = require("./logout-user-use-case");
describe("LogoutUserUseCase", () => {
    it("should orchestrate the delete authentication action correctly", async () => {
        const useCasePayload = {
            refreshToken: "refresh_token",
        };
        const mockAuthenticationRepository = jme.mock();
        mockAuthenticationRepository.verifyTokenIsExists.mockResolvedValue(undefined);
        mockAuthenticationRepository.deleteToken.mockResolvedValue(undefined);
        const logoutUserUseCase = new logout_user_use_case_1.LogoutUserUseCase({
            authenticationRepository: mockAuthenticationRepository,
        });
        await logoutUserUseCase.execute(useCasePayload);
        expect(mockAuthenticationRepository.verifyTokenIsExists).toHaveBeenCalledWith(useCasePayload.refreshToken);
        expect(mockAuthenticationRepository.deleteToken).toHaveBeenCalledWith(useCasePayload.refreshToken);
    });
    it("should throw an error if the payload does not contain a refresh token", async () => {
        const logoutUserUseCase = new logout_user_use_case_1.LogoutUserUseCase({});
        await expect(logoutUserUseCase.execute({})).rejects.toThrow(delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN);
    });
    it("should throw an error if the refresh token is not string", async () => {
        const useCasePayload = {
            refreshToken: 123,
        };
        const logoutUserUseCase = new logout_user_use_case_1.LogoutUserUseCase({});
        await expect(logoutUserUseCase.execute(useCasePayload)).rejects.toThrow(delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE);
    });
});
