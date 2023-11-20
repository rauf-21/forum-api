import * as Hapi from "@hapi/hapi";

import { AddCommentUseCase } from "../../../../applications/use-case/add-comment-use-case";
import { SoftDeleteCommentUseCase } from "../../../../applications/use-case/soft-delete-comment-use-case";

interface CommentsHandlerDependencies {
  addCommentUseCase: AddCommentUseCase;
  softDeleteCommentUseCase: SoftDeleteCommentUseCase;
}

export class CommentsHandler {
  readonly #addCommentUseCase: AddCommentUseCase;

  readonly #softDeleteCommentUseCase: SoftDeleteCommentUseCase;

  constructor(dependencies: CommentsHandlerDependencies) {
    const { addCommentUseCase, softDeleteCommentUseCase } = dependencies;

    this.#addCommentUseCase = addCommentUseCase;
    this.#softDeleteCommentUseCase = softDeleteCommentUseCase;
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { id: owner } = request.auth.credentials;

    const { threadId } = request.params;

    const payload =
      typeof request.payload === "object"
        ? { ...request.payload, owner, threadId }
        : request.payload;

    const addedComment = await this.#addCommentUseCase.execute(payload);

    return h
      .response({
        status: "success",
        data: {
          addedComment,
        },
      })
      .code(201);
  }

  async deleteCommentHandler(request: Hapi.Request) {
    const { id: owner } = request.auth.credentials;

    const { threadId, commentId } = request.params;

    await this.#softDeleteCommentUseCase.execute({
      id: commentId,
      owner,
      threadId,
    });

    return {
      status: "success",
    };
  }
}
