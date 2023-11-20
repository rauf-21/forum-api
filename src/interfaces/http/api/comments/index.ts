import * as Hapi from "@hapi/hapi";

import { AddCommentUseCase } from "../../../../applications/use-case/add-comment-use-case";
import { SoftDeleteCommentUseCase } from "../../../../applications/use-case/soft-delete-comment-use-case";
import { CommentsHandler } from "./handler";
import { commentsRoutes } from "./routes";

interface CommentsPluginOptions {
  addCommentUseCase: AddCommentUseCase;
  softDeleteCommentUseCase: SoftDeleteCommentUseCase;
}

export const commentsPlugin: Hapi.Plugin<CommentsPluginOptions> = {
  name: "comments",
  register(server, options) {
    const { addCommentUseCase, softDeleteCommentUseCase } = options;

    const commentsHandler = new CommentsHandler({
      addCommentUseCase,
      softDeleteCommentUseCase,
    });

    server.route(commentsRoutes(commentsHandler));
  },
};
