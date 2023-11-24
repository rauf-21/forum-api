import * as jme from "jest-mock-extended";

import { DELETE_AUTHENTICATION_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/delete-authentication-use-case-error";
import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import {
  LogoutUserUseCase,
  LogoutUserUseCaseDependencies,
} from "./logout-user-use-case";

describe("LogoutUserUseCase", () => {
  it("should orchestrate the delete authentication action correctly", async () => {
    const useCasePayload = {
      refreshToken: "refresh_token",
    };

    const mockAuthenticationRepository = jme.mock<AuthenticationRepository>();

    mockAuthenticationRepository.verifyTokenIsExists.mockResolvedValue(
      undefined
    );
    mockAuthenticationRepository.deleteToken.mockResolvedValue(undefined);

    const logoutUserUseCase = new LogoutUserUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    await logoutUserUseCase.execute(useCasePayload);

    expect(
      mockAuthenticationRepository.verifyTokenIsExists
    ).toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken).toHaveBeenCalledWith(
      useCasePayload.refreshToken
    );
  });

  it("should throw an error if the payload does not contain a refresh token", async () => {
    const logoutUserUseCase = new LogoutUserUseCase(
      {} as unknown as LogoutUserUseCaseDependencies
    );

    await expect(logoutUserUseCase.execute({})).rejects.toThrow(
      DELETE_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN
    );
  });

  it("should throw an error if the refresh token is not string", async () => {
    const useCasePayload = {
      refreshToken: 123,
    };

    const logoutUserUseCase = new LogoutUserUseCase(
      {} as unknown as LogoutUserUseCaseDependencies
    );

    await expect(logoutUserUseCase.execute(useCasePayload)).rejects.toThrow(
      DELETE_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE
    );
  });
});
