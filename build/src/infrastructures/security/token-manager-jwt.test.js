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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("@hapi/jwt"));
const jme = __importStar(require("jest-mock-extended"));
const authentication_token_manager_error_1 = require("../../commons/constants/applications/security/authentication-token-manager-error");
const token_1 = require("../../commons/constants/infrastructures/token");
const token_manager_jwt_1 = require("./token-manager-jwt");
describe("TokenManagerJwt", () => {
    describe("createAccessToken method", () => {
        it("should be able to create the accessToken correctly", async () => {
            const payload = {
                username: "bono",
            };
            const mockJwtToken = jme.mock();
            mockJwtToken.generate.mockReturnValue("token");
            const tokenManagerJwt = new token_manager_jwt_1.TokenManagerJwt(mockJwtToken);
            const accessToken = await tokenManagerJwt.createAccessToken(payload);
            expect(accessToken).toEqual("token");
            expect(mockJwtToken.generate).toHaveBeenCalledWith(payload, token_1.ACCESS_TOKEN_SECRET);
        });
    });
    describe("createRefreshToken method", () => {
        it("should be able to create the refreshToken correctly", async () => {
            const payload = {
                username: "bono",
            };
            const mockJwtToken = jme.mock();
            mockJwtToken.generate.mockReturnValue("token");
            const tokenManagerJwt = new token_manager_jwt_1.TokenManagerJwt(mockJwtToken);
            const refreshToken = await tokenManagerJwt.createRefreshToken(payload);
            expect(refreshToken).toEqual("token");
            expect(mockJwtToken.generate).toHaveBeenCalledWith(payload, token_1.REFRESH_TOKEN_SECRET);
        });
    });
    describe("verifyRefreshToken function", () => {
        it("should be able to verify the refresh token", async () => {
            const tokenManagerJwt = new token_manager_jwt_1.TokenManagerJwt(jwt_1.default.token);
            const refreshToken = await tokenManagerJwt.createRefreshToken({
                username: "bono",
            });
            await expect(tokenManagerJwt.verifyRefreshToken(refreshToken)).resolves.not.toThrow(Error);
        });
        it("should throw an error if verification fails", async () => {
            const tokenManagerJwt = new token_manager_jwt_1.TokenManagerJwt(jwt_1.default.token);
            const accessToken = await tokenManagerJwt.createAccessToken({
                username: "bono",
            });
            await expect(tokenManagerJwt.verifyRefreshToken(accessToken)).rejects.toThrow(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.INVALID_REFRESH_TOKEN);
        });
    });
    describe("decodePayload method", () => {
        it("should be able to decode the payload correctly", async () => {
            const tokenManagerJwt = new token_manager_jwt_1.TokenManagerJwt(jwt_1.default.token);
            const accessToken = await tokenManagerJwt.createAccessToken({
                username: "bono",
            });
            const { username } = await tokenManagerJwt.decodePayload(accessToken);
            expect(username).toEqual("bono");
        });
    });
});
