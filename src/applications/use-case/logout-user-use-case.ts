import { z } from "zod";

import { DELETE_AUTHENTICATION_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/delete-authentication-use-case-error";
import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";

const LogoutUserUseCasePayloadSchema = z.object({
  refreshToken: z.string({
    required_error: DELETE_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN,
    invalid_type_error:
      DELETE_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE,
  }),
});

export interface LogoutUserUseCaseDependencies {
  authenticationRepository: AuthenticationRepository;
}

export class LogoutUserUseCase {
  readonly #authenticationRepository: AuthenticationRepository;

  constructor(dependencies: LogoutUserUseCaseDependencies) {
    const { authenticationRepository } = dependencies;

    this.#authenticationRepository = authenticationRepository;
  }

  async execute(payload: unknown) {
    const result = LogoutUserUseCasePayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { refreshToken } = result.data;

    await this.#authenticationRepository.verifyTokenIsExists(refreshToken);
    await this.#authenticationRepository.deleteToken(refreshToken);
  }
}
