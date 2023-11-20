import * as Hapi from "@hapi/hapi";

import { AddReplyUseCase } from "../../../../applications/use-case/add-reply-use-case";
import { SoftDeleteReplyUseCase } from "../../../../applications/use-case/soft-delete-reply-use-case";
import { RepliesHandler } from "./handler";
import { repliesRoutes } from "./routes";

interface RepliesPluginOptions {
  addReplyUseCase: AddReplyUseCase;
  softDeleteReplyUseCase: SoftDeleteReplyUseCase;
}

export const repliesPlugin: Hapi.Plugin<RepliesPluginOptions> = {
  name: "replies",
  register(server, options) {
    const { addReplyUseCase, softDeleteReplyUseCase } = options;

    const repliesHandler = new RepliesHandler({
      addReplyUseCase,
      softDeleteReplyUseCase,
    });

    server.route(repliesRoutes(repliesHandler));
  },
};
