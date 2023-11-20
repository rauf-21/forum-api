import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import { NewAuthentication } from "../../domains/authentications/entities/new-authentication";
import { UserLogin } from "../../domains/users/entities/user-login";
import { UserRepository } from "../../domains/users/user-repository";
import { AuthenticationTokenManager } from "../security/authentication-token-manager";
import { PasswordHash } from "../security/password-hash";

interface LoginUserUseCaseDependencies {
  userRepository: UserRepository;
  authenticationRepository: AuthenticationRepository;
  authenticationTokenManager: AuthenticationTokenManager;
  passwordHash: PasswordHash;
}

export class LoginUserUseCase {
  readonly #userRepository: UserRepository;

  readonly #authenticationRepository: AuthenticationRepository;

  readonly #authenticationTokenManager: AuthenticationTokenManager;

  readonly #passwordHash: PasswordHash;

  constructor(dependencies: LoginUserUseCaseDependencies) {
    const {
      userRepository,
      authenticationRepository,
      authenticationTokenManager,
      passwordHash,
    } = dependencies;

    this.#userRepository = userRepository;
    this.#authenticationRepository = authenticationRepository;
    this.#authenticationTokenManager = authenticationTokenManager;
    this.#passwordHash = passwordHash;
  }

  async execute(payload: unknown) {
    const { username, password } = new UserLogin(payload);

    const { id, password: hashedPassword } =
      await this.#userRepository.getUserByUsername(username);

    await this.#passwordHash.verifyPassword(password, hashedPassword);

    const accessToken =
      await this.#authenticationTokenManager.createAccessToken({
        id,
        username,
      });

    const refreshToken =
      await this.#authenticationTokenManager.createRefreshToken({
        id,
        username,
      });

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this.#authenticationRepository.addToken(
      newAuthentication.refreshToken
    );

    return newAuthentication;
  }
}
