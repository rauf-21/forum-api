import Jwt, { HapiJwt } from "@hapi/jwt";

import { AUTHENTICATION_TOKEN_MANAGER_ERROR } from "../../commons/constants/applications/security/authentication-token-manager-error";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../../commons/constants/infrastructures/token";
import { TokenManagerJwt } from "./token-manager-jwt";

describe("TokenManagerJwt", () => {
  describe("createAccessToken method", () => {
    it("should be able to create the accessToken correctly", async () => {
      const payload = {
        username: "dicoding",
      };

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => "mock_token"),
      } satisfies Partial<HapiJwt.Token> as unknown as HapiJwt.Token;

      const tokenManagerJwt = new TokenManagerJwt(mockJwtToken);

      const accessToken = await tokenManagerJwt.createAccessToken(payload);

      expect(mockJwtToken.generate).toHaveBeenCalledWith(
        payload,
        ACCESS_TOKEN_SECRET
      );
      expect(accessToken).toEqual("mock_token");
    });
  });

  describe("createRefreshToken method", () => {
    it("should be able to create the refreshToken correctly", async () => {
      const payload = {
        username: "dicoding",
      };

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => "mock_token"),
      } satisfies Partial<HapiJwt.Token> as unknown as HapiJwt.Token;

      const tokenManagerJwt = new TokenManagerJwt(mockJwtToken);

      const refreshToken = await tokenManagerJwt.createRefreshToken(payload);

      expect(mockJwtToken.generate).toHaveBeenCalledWith(
        payload,
        REFRESH_TOKEN_SECRET
      );
      expect(refreshToken).toEqual("mock_token");
    });
  });

  describe("verifyRefreshToken function", () => {
    it("should throw an error if verification failed", async () => {
      const tokenManagerJwt = new TokenManagerJwt(Jwt.token);

      const accessToken = await tokenManagerJwt.createAccessToken({
        username: "dicoding",
      });

      await expect(
        tokenManagerJwt.verifyRefreshToken(accessToken)
      ).rejects.toThrow(
        AUTHENTICATION_TOKEN_MANAGER_ERROR.INVALID_REFRESH_TOKEN
      );
    });

    it("should not throw an error if the refresh token is verified", async () => {
      const tokenManagerJwt = new TokenManagerJwt(Jwt.token);

      const refreshToken = await tokenManagerJwt.createRefreshToken({
        username: "dicoding",
      });

      const result = await tokenManagerJwt.verifyRefreshToken(refreshToken);

      expect(result).toEqual(undefined);
    });
  });

  describe("decodePayload method", () => {
    it("should be able to decode the payload correctly", async () => {
      const tokenManagerJwt = new TokenManagerJwt(Jwt.token);

      const accessToken = await tokenManagerJwt.createAccessToken({
        username: "dicoding",
      });

      const { username: expectedUsername } =
        await tokenManagerJwt.decodePayload(accessToken);

      expect(expectedUsername).toEqual("dicoding");
    });
  });
});
