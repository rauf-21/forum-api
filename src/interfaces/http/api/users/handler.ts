import * as Hapi from "@hapi/hapi";

import { AddUserUseCase } from "../../../../applications/use-case/add-user-use-case";

interface UsersHandlerDependencies {
  addUserUseCase: AddUserUseCase;
}

export class UsersHandler {
  readonly #addUserUseCase: AddUserUseCase;

  constructor(dependencies: UsersHandlerDependencies) {
    const { addUserUseCase } = dependencies;

    this.#addUserUseCase = addUserUseCase;
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const addedUser = await this.#addUserUseCase.execute(request.payload);

    return h
      .response({
        status: "success",
        data: {
          addedUser,
        },
      })
      .code(201);
  }
}
