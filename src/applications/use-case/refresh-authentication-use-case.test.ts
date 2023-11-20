import { REFRESH_AUTHENTICATION_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/refresh-authentication-use-case-error";
import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import { AuthenticationTokenManager } from "../security/authentication-token-manager";
import {
  RefreshAuthenticationUseCase,
  RefreshAuthenticationUseCaseDependencies,
} from "./refresh-authentication-use-case";

describe("RefreshAuthenticationUseCase", () => {
  it("should throw an error if the use case payload does not contain a refresh token", async () => {
    const useCasePayload = {};

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase(
      {} satisfies Partial<RefreshAuthenticationUseCaseDependencies> as unknown as RefreshAuthenticationUseCaseDependencies
    );

    await expect(
      refreshAuthenticationUseCase.execute(useCasePayload)
    ).rejects.toThrow(
      REFRESH_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN
    );
  });

  it("should throw an error if the refresh token is not string", async () => {
    const useCasePayload = {
      refreshToken: 1,
    };

    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase(
      {} satisfies Partial<RefreshAuthenticationUseCaseDependencies> as unknown as RefreshAuthenticationUseCaseDependencies
    );

    await expect(
      refreshAuthenticationUseCase.execute(useCasePayload)
    ).rejects.toThrow(
      REFRESH_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE
    );
  });

  it("should orchestrate the refresh authentication action correctly", async () => {
    const useCasePayload = {
      refreshToken: "some_refresh_token",
    };

    const mockAuthenticationRepository = {
      verifyTokenIsExists: jest.fn().mockResolvedValue(undefined),
    } satisfies Partial<AuthenticationRepository> as unknown as AuthenticationRepository;

    const mockAuthenticationTokenManager = {
      verifyRefreshToken: jest.fn().mockResolvedValue(undefined),
      decodePayload: jest
        .fn()
        .mockResolvedValue({ username: "dicoding", id: "user-123" }),
      createAccessToken: jest.fn().mockResolvedValue("some_new_access_token"),
    } satisfies Partial<AuthenticationTokenManager> as unknown as AuthenticationTokenManager;

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
      username: "dicoding",
      id: "user-123",
    });
    expect(accessToken).toEqual("some_new_access_token");
  });
});
