import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import { NewAuthentication } from "../../domains/authentications/entities/new-authentication";
import { UserRepository } from "../../domains/users/user-repository";
import { AuthenticationTokenManager } from "../security/authentication-token-manager";
import { PasswordHash } from "../security/password-hash";
import { LoginUserUseCase } from "./login-user-use-case";

describe("LoginUserUseCase", () => {
  it("should orchestrate the get authentication action correctly", async () => {
    const useCasePayload = {
      username: "dicoding",
      password: "secret",
    };

    const mockedAuthentication = new NewAuthentication({
      accessToken: "access_token",
      refreshToken: "refresh_token",
    });

    const mockUserRepository = {
      getUserByUsername: jest
        .fn()
        .mockResolvedValue({ id: "user-123", password: "hashed_password" }),
    } satisfies Partial<UserRepository> as unknown as UserRepository;

    const mockAuthenticationRepository = {
      addToken: jest.fn().mockResolvedValue(undefined),
    } satisfies Partial<AuthenticationRepository> as unknown as AuthenticationRepository;

    const mockAuthenticationTokenManager = {
      createAccessToken: jest
        .fn()
        .mockResolvedValue(mockedAuthentication.accessToken),
      createRefreshToken: jest
        .fn()
        .mockResolvedValue(mockedAuthentication.refreshToken),
    } satisfies Partial<AuthenticationTokenManager> as unknown as AuthenticationTokenManager;

    const mockPasswordHash = {
      verifyPassword: jest.fn().mockResolvedValue(undefined),
    } satisfies Partial<PasswordHash> as unknown as PasswordHash;

    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    expect(actualAuthentication).toEqual(
      new NewAuthentication({
        accessToken: "access_token",
        refreshToken: "refresh_token",
      })
    );
    expect(mockUserRepository.getUserByUsername).toHaveBeenCalledWith(
      "dicoding"
    );
    expect(mockPasswordHash.verifyPassword).toHaveBeenCalledWith(
      "secret",
      "hashed_password"
    );
    expect(
      mockAuthenticationTokenManager.createAccessToken
    ).toHaveBeenCalledWith({
      username: "dicoding",
      id: "user-123",
    });
    expect(
      mockAuthenticationTokenManager.createRefreshToken
    ).toHaveBeenCalledWith({
      username: "dicoding",
      id: "user-123",
    });
    expect(mockAuthenticationRepository.addToken).toHaveBeenCalledWith(
      mockedAuthentication.refreshToken
    );
  });
});
