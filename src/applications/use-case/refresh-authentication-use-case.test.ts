import * as jme from "jest-mock-extended";

import { REFRESH_AUTHENTICATION_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/refresh-authentication-use-case-error";
import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import { AuthenticationTokenManager } from "../security/authentication-token-manager";
import {
  RefreshAuthenticationUseCase,
  RefreshAuthenticationUseCaseDependencies,
} from "./refresh-authentication-use-case";

describe("RefreshAuthenticationUseCase", () => {
  it("should orchestrate the refresh authentication action correctly", async () => {
    const useCasePayload = {
      refreshToken: "refresh_token",
    };

    const mockAuthenticationRepository = jme.mock<AuthenticationRepository>();

    mockAuthenticationRepository.verifyTokenIsExists.mockResolvedValue(
      undefined
    );

    const mockAuthenticationTokenManager =
      jme.mock<AuthenticationTokenManager>();

    mockAuthenticationTokenManager.verifyRefreshToken.mockResolvedValue(
      undefined
    );
    mockAuthenticationTokenManager.decodePayload.mockResolvedValue({
      id: "user-123",
      username: "bono",
    });
    mockAuthenticationTokenManager.createAccessToken.mockResolvedValue(
      "access_token"
    );

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    const accessToken =
      await refreshAuthenticationUseCase.execute(useCasePayload);

    expect(
      mockAuthenticationTokenManager.verifyRefreshToken
    ).toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(
      mockAuthenticationRepository.verifyTokenIsExists
    ).toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationTokenManager.decodePayload).toHaveBeenCalledWith(
      useCasePayload.refreshToken
    );
    expect(
      mockAuthenticationTokenManager.createAccessToken
    ).toHaveBeenCalledWith({
      id: "user-123",
      username: "bono",
    });
    expect(accessToken).toEqual("access_token");
  });

  it("should throw an error if the payload does not contain a refresh token", async () => {
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase(
      {} as unknown as RefreshAuthenticationUseCaseDependencies
    );

    await expect(refreshAuthenticationUseCase.execute({})).rejects.toThrow(
      REFRESH_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN
    );
  });

  it("should throw an error if the refresh token is not string", async () => {
    const useCasePayload = {
      refreshToken: 1,
    };

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase(
      {} as unknown as RefreshAuthenticationUseCaseDependencies
    );

    await expect(
      refreshAuthenticationUseCase.execute(useCasePayload)
    ).rejects.toThrow(
      REFRESH_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE
    );
  });
});
