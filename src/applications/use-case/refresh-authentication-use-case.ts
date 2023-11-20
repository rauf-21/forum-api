import { z } from "zod";

import { REFRESH_AUTHENTICATION_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/refresh-authentication-use-case-error";
import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import { AuthenticationTokenManager } from "../security/authentication-token-manager";

const RefreshAuthenticationUseCasePayloadSchema = z.object({
  refreshToken: z.string({
    required_error: REFRESH_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN,
    invalid_type_error:
      REFRESH_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE,
  }),
});

export interface RefreshAuthenticationUseCaseDependencies {
  authenticationRepository: AuthenticationRepository;
  authenticationTokenManager: AuthenticationTokenManager;
}

export class RefreshAuthenticationUseCase {
  readonly #authenticationRepository: AuthenticationRepository;

  readonly #authenticationTokenManager: AuthenticationTokenManager;

  constructor(dependencies: RefreshAuthenticationUseCaseDependencies) {
    const { authenticationRepository, authenticationTokenManager } =
      dependencies;

    this.#authenticationRepository = authenticationRepository;
    this.#authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload: unknown) {
    const result = RefreshAuthenticationUseCasePayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { refreshToken } = result.data;

    await this.#authenticationTokenManager.verifyRefreshToken(refreshToken);
    await this.#authenticationRepository.verifyTokenIsExists(refreshToken);

    const refreshTokenPayload =
      await this.#authenticationTokenManager.decodePayload(refreshToken);

    const accessToken =
      await this.#authenticationTokenManager.createAccessToken(
        refreshTokenPayload
      );

    return accessToken;
  }
}
