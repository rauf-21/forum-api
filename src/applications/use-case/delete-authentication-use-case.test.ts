import * as jme from "jest-mock-extended";

import { DELETE_AUTHENTICATION_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/delete-authentication-use-case-error";
import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import {
  DeleteAuthenticationUseCase,
  DeleteAuthenticationUseCaseDependencies,
} from "./delete-authentication-use-case";

describe("DeleteAuthenticationUseCase", () => {
  it("should orchestrate the delete authentication action correctly", async () => {
    const useCasePayload = {
      refreshToken: "refreshToken",
    };

    const mockAuthenticationRepository = jme.mock<AuthenticationRepository>();

    mockAuthenticationRepository.verifyTokenIsExists.mockResolvedValue(
      undefined
    );
    mockAuthenticationRepository.deleteToken.mockResolvedValue(undefined);

    const deleteAuthenticationUseCase = new DeleteAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    await deleteAuthenticationUseCase.execute(useCasePayload);

    expect(
      mockAuthenticationRepository.verifyTokenIsExists
    ).toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken).toHaveBeenCalledWith(
      useCasePayload.refreshToken
    );
  });

  it("should throw an error if the payload does not contain a refresh token", async () => {
    const deleteAuthenticationUseCase = new DeleteAuthenticationUseCase(
      {} as unknown as DeleteAuthenticationUseCaseDependencies
    );

    await expect(deleteAuthenticationUseCase.execute({})).rejects.toThrow(
      DELETE_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN
    );
  });

  it("should throw an error if the refresh token is not a string", async () => {
    const useCasePayload = {
      refreshToken: 123,
    };

    const deleteAuthenticationUseCase = new DeleteAuthenticationUseCase(
      {} as unknown as DeleteAuthenticationUseCaseDependencies
    );

    await expect(
      deleteAuthenticationUseCase.execute(useCasePayload)
    ).rejects.toThrow(
      DELETE_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE
    );
  });
});
