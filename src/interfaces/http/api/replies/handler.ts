import * as Hapi from "@hapi/hapi";

import { AddReplyUseCase } from "../../../../applications/use-case/add-reply-use-case";
import { SoftDeleteReplyUseCase } from "../../../../applications/use-case/soft-delete-reply-use-case";

interface RepliesHandlerDependencies {
  addReplyUseCase: AddReplyUseCase;
  softDeleteReplyUseCase: SoftDeleteReplyUseCase;
}

export class RepliesHandler {
  readonly #addReplyUseCase: AddReplyUseCase;

  readonly #softDeleteReplyUseCase: SoftDeleteReplyUseCase;

  constructor(dependencies: RepliesHandlerDependencies) {
    const { addReplyUseCase, softDeleteReplyUseCase } = dependencies;

    this.#addReplyUseCase = addReplyUseCase;
    this.#softDeleteReplyUseCase = softDeleteReplyUseCase;
    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postReplyHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { id: owner } = request.auth.credentials;

    const { threadId, commentId } = request.params;

    const payload =
      typeof request.payload === "object"
        ? { ...request.payload, owner, threadId, commentId }
        : request.payload;

    const addedReply = await this.#addReplyUseCase.execute(payload);

    return h
      .response({
        status: "success",
        data: {
          addedReply,
        },
      })
      .code(201);
  }

  async deleteReplyHandler(request: Hapi.Request) {
    const { id: owner } = request.auth.credentials;

    const { threadId, commentId, replyId } = request.params;

    await this.#softDeleteReplyUseCase.execute({
      id: replyId,
      owner,
      threadId,
      commentId,
    });

    return {
      status: "success",
    };
  }
}
