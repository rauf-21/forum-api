import * as Hapi from "@hapi/hapi";

import { AddThreadUseCase } from "../../../../applications/use-case/add-thread-use-case";
import { GetThreadDetailUseCase } from "../../../../applications/use-case/get-thread-detail-use-case";
import { ThreadsHandler } from "./handler";
import { threadsRoutes } from "./routes";

interface ThreadsPluginOptions {
  addThreadUseCase: AddThreadUseCase;
  getThreadDetailUseCase: GetThreadDetailUseCase;
}

export const threadsPlugin: Hapi.Plugin<ThreadsPluginOptions> = {
  name: "threads",
  register(server, options) {
    const { addThreadUseCase, getThreadDetailUseCase } = options;

    const threadsHandler = new ThreadsHandler({
      addThreadUseCase,
      getThreadDetailUseCase,
    });

    server.route(threadsRoutes(threadsHandler));
  },
};
