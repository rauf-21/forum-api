import * as Hapi from "@hapi/hapi";

import { AddUserUseCase } from "../../../../applications/use-case/add-user-use-case";
import { UsersHandler } from "./handler";
import { usersRoutes } from "./routes";

interface UsersPluginOptions {
  addUserUseCase: AddUserUseCase;
}

export const usersPlugin: Hapi.Plugin<UsersPluginOptions> = {
  name: "users",
  register(server, options) {
    const { addUserUseCase } = options;

    const usersHandler = new UsersHandler({ addUserUseCase });

    const routes = usersRoutes(usersHandler);

    server.route(routes);
  },
};
