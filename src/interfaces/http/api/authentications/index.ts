import * as Hapi from "@hapi/hapi";

import { LoginUserUseCase } from "../../../../applications/use-case/login-user-use-case";
import { LogoutUserUseCase } from "../../../../applications/use-case/logout-user-use-case";
import { RefreshAuthenticationUseCase } from "../../../../applications/use-case/refresh-authentication-use-case";
import { AuthenticationsHandler } from "./handler";
import { authenticationsRoutes } from "./routes";

interface AuthenticationsPluginOptions {
  loginUserUseCase: LoginUserUseCase;
  logoutUserUseCase: LogoutUserUseCase;
  refreshAuthenticationUseCase: RefreshAuthenticationUseCase;
}

export const authenticationsPlugin: Hapi.Plugin<AuthenticationsPluginOptions> =
  {
    name: "authentications",
    register(server, options) {
      const {
        loginUserUseCase,
        logoutUserUseCase,
        refreshAuthenticationUseCase,
      } = options;

      const authenticationsHandler = new AuthenticationsHandler({
        loginUserUseCase,
        logoutUserUseCase,
        refreshAuthenticationUseCase,
      });

      const routes = authenticationsRoutes(authenticationsHandler);

      server.route(routes);
    },
  };
