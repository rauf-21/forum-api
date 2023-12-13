import * as Hapi from "@hapi/hapi";

import { AddCommentUseCase } from "../../../../applications/use-case/add-comment-use-case";
import { SoftDeleteCommentUseCase } from "../../../../applications/use-case/soft-delete-comment-use-case";
import { ToggleCommentLikeUseCase } from "../../../../applications/use-case/toggle-comment-like-use-case";

interface CommentsHandlerDependencies {
  addCommentUseCase: AddCommentUseCase;
  softDeleteCommentUseCase: SoftDeleteCommentUseCase;
  toggleCommentLikeUseCase: ToggleCommentLikeUseCase;
}

export class CommentsHandler {
  readonly #addCommentUseCase: AddCommentUseCase;

  readonly #softDeleteCommentUseCase: SoftDeleteCommentUseCase;

  readonly #toggleCommentLikeUseCase: ToggleCommentLikeUseCase;

  constructor(dependencies: CommentsHandlerDependencies) {
    const {
      addCommentUseCase,
      softDeleteCommentUseCase,
      toggleCommentLikeUseCase,
    } = dependencies;

    this.#addCommentUseCase = addCommentUseCase;
    this.#softDeleteCommentUseCase = softDeleteCommentUseCase;
    this.#toggleCommentLikeUseCase = toggleCommentLikeUseCase;
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
    this.toggleCommentLikeHandler = this.toggleCommentLikeHandler.bind(this);
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

  async toggleCommentLikeHandler(request: Hapi.Request) {
    const { id: owner } = request.auth.credentials;

    const { threadId, commentId } = request.params;

    await this.#toggleCommentLikeUseCase.execute({
      id: commentId,
      threadId,
      owner,
    });

    return {
      status: "success",
    };
  }
}
