import * as Hapi from "@hapi/hapi";

import { LoginUserUseCase } from "../../../../applications/use-case/login-user-use-case";
import { LogoutUserUseCase } from "../../../../applications/use-case/logout-user-use-case";
import { RefreshAuthenticationUseCase } from "../../../../applications/use-case/refresh-authentication-use-case";

interface AuthenticationsHandlerDependencies {
  loginUserUseCase: LoginUserUseCase;
  logoutUserUseCase: LogoutUserUseCase;
  refreshAuthenticationUseCase: RefreshAuthenticationUseCase;
}

export class AuthenticationsHandler {
  readonly #loginUserUseCase: LoginUserUseCase;

  readonly #logoutUserUseCase: LogoutUserUseCase;

  readonly #refreshAuthenticationUseCase: RefreshAuthenticationUseCase;

  constructor(dependencies: AuthenticationsHandlerDependencies) {
    const {
      loginUserUseCase,
      logoutUserUseCase,
      refreshAuthenticationUseCase,
    } = dependencies;

    this.#loginUserUseCase = loginUserUseCase;
    this.#logoutUserUseCase = logoutUserUseCase;
    this.#refreshAuthenticationUseCase = refreshAuthenticationUseCase;
    this.postAuhenticationHandler = this.postAuhenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler =
      this.deleteAuthenticationHandler.bind(this);
  }

  async postAuhenticationHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const { accessToken, refreshToken } = await this.#loginUserUseCase.execute(
      request.payload
    );

    return h
      .response({
        status: "success",
        data: { accessToken, refreshToken },
      })
      .code(201);
  }

  async putAuthenticationHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const accessToken = await this.#refreshAuthenticationUseCase.execute(
      request.payload
    );

    return h.response({
      status: "success",
      data: {
        accessToken,
      },
    });
  }

  async deleteAuthenticationHandler(request: Hapi.Request) {
    await this.#logoutUserUseCase.execute(request.payload);

    return {
      status: "success",
    };
  }
}
