import * as jme from "jest-mock-extended";

import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import { NewAuthentication } from "../../domains/authentications/entities/new-authentication";
import { UserRepository } from "../../domains/users/user-repository";
import { AuthenticationTokenManager } from "../security/authentication-token-manager";
import { PasswordHash } from "../security/password-hash";
import { LoginUserUseCase } from "./login-user-use-case";

describe("LoginUserUseCase", () => {
  it("should orchestrate the get authentication action correctly", async () => {
    const useCasePayload = {
      username: "bono",
      password: "plain_password",
    };

    const mockUserRepository = jme.mock<UserRepository>();

    mockUserRepository.getUserByUsername.mockResolvedValue({
      id: "user-123",
      password: "hashed_password",
      username: "bono",
      fullname: "bono bono",
    });

    const mockAuthenticationRepository = jme.mock<AuthenticationRepository>();

    mockAuthenticationRepository.addToken.mockResolvedValue(undefined);

    const mockAuthenticationTokenManager =
      jme.mock<AuthenticationTokenManager>();

    mockAuthenticationTokenManager.createAccessToken.mockResolvedValue(
      "access_token"
    );
    mockAuthenticationTokenManager.createRefreshToken.mockResolvedValue(
      "refresh_token"
    );

    const mockPasswordHash = jme.mock<PasswordHash>();

    mockPasswordHash.verifyPassword.mockResolvedValue(undefined);

    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    const authentication = await loginUserUseCase.execute(useCasePayload);

    expect(authentication).toEqual(
      new NewAuthentication({
        accessToken: "access_token",
        refreshToken: "refresh_token",
      })
    );
    expect(mockUserRepository.getUserByUsername).toHaveBeenCalledWith("bono");
    expect(mockPasswordHash.verifyPassword).toHaveBeenCalledWith(
      "plain_password",
      "hashed_password"
    );
    expect(
      mockAuthenticationTokenManager.createAccessToken
    ).toHaveBeenCalledWith({
      id: "user-123",
      username: "bono",
    });
    expect(
      mockAuthenticationTokenManager.createRefreshToken
    ).toHaveBeenCalledWith({
      id: "user-123",
      username: "bono",
    });
    expect(mockAuthenticationRepository.addToken).toHaveBeenCalledWith(
      "refresh_token"
    );
  });
});
