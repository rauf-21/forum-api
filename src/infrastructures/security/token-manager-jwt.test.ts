import Jwt, { HapiJwt } from "@hapi/jwt";
import * as jme from "jest-mock-extended";

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
        username: "bono",
      };

      const mockJwtToken = jme.mock<HapiJwt.Token>();

      mockJwtToken.generate.mockReturnValue("token");

      const tokenManagerJwt = new TokenManagerJwt(mockJwtToken);

      const accessToken = await tokenManagerJwt.createAccessToken(payload);

      expect(accessToken).toEqual("token");
      expect(mockJwtToken.generate).toHaveBeenCalledWith(
        payload,
        ACCESS_TOKEN_SECRET
      );
    });
  });

  describe("createRefreshToken method", () => {
    it("should be able to create the refreshToken correctly", async () => {
      const payload = {
        username: "bono",
      };

      const mockJwtToken = jme.mock<HapiJwt.Token>();

      mockJwtToken.generate.mockReturnValue("token");

      const tokenManagerJwt = new TokenManagerJwt(mockJwtToken);

      const refreshToken = await tokenManagerJwt.createRefreshToken(payload);

      expect(refreshToken).toEqual("token");
      expect(mockJwtToken.generate).toHaveBeenCalledWith(
        payload,
        REFRESH_TOKEN_SECRET
      );
    });
  });

  describe("verifyRefreshToken function", () => {
    it("should be able to verify the refresh token", async () => {
      const tokenManagerJwt = new TokenManagerJwt(Jwt.token);

      const refreshToken = await tokenManagerJwt.createRefreshToken({
        username: "bono",
      });

      await expect(
        tokenManagerJwt.verifyRefreshToken(refreshToken)
      ).resolves.not.toThrow(Error);
    });

    it("should throw an error if verification fails", async () => {
      const tokenManagerJwt = new TokenManagerJwt(Jwt.token);

      const accessToken = await tokenManagerJwt.createAccessToken({
        username: "bono",
      });

      await expect(
        tokenManagerJwt.verifyRefreshToken(accessToken)
      ).rejects.toThrow(
        AUTHENTICATION_TOKEN_MANAGER_ERROR.INVALID_REFRESH_TOKEN
      );
    });
  });

  describe("decodePayload method", () => {
    it("should be able to decode the payload correctly", async () => {
      const tokenManagerJwt = new TokenManagerJwt(Jwt.token);

      const accessToken = await tokenManagerJwt.createAccessToken({
        username: "bono",
      });

      const { username } = await tokenManagerJwt.decodePayload(accessToken);

      expect(username).toEqual("bono");
    });
  });
});
