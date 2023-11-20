import * as Hapi from "@hapi/hapi";

import { AddThreadUseCase } from "../../../../applications/use-case/add-thread-use-case";
import { GetThreadDetailUseCase } from "../../../../applications/use-case/get-thread-detail-use-case";

interface ThreadsHandlerDependencies {
  addThreadUseCase: AddThreadUseCase;
  getThreadDetailUseCase: GetThreadDetailUseCase;
}

export class ThreadsHandler {
  readonly #addThreadUseCase: AddThreadUseCase;

  readonly #getThreadDetailUseCase: GetThreadDetailUseCase;

  constructor(dependencies: ThreadsHandlerDependencies) {
    const { addThreadUseCase, getThreadDetailUseCase } = dependencies;

    this.#addThreadUseCase = addThreadUseCase;
    this.#getThreadDetailUseCase = getThreadDetailUseCase;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { id: owner } = request.auth.credentials;

    const payload =
      typeof request.payload === "object"
        ? { owner, ...request.payload }
        : request.payload;

    const addedThread = await this.#addThreadUseCase.execute(payload);

    return h
      .response({
        status: "success",
        data: {
          addedThread,
        },
      })
      .code(201);
  }

  async getThreadHandler(request: Hapi.Request) {
    const { threadId } = request.params;

    const detailThread = await this.#getThreadDetailUseCase.execute({
      threadId,
    });

    return {
      status: "success",
      data: {
        thread: detailThread,
      },
    };
  }
}
