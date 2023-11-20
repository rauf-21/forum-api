import * as Hapi from "@hapi/hapi";

import { AUTHENTICATION_STRATEGY } from "../../../../commons/constants/applications/security/authentication-strategy";
import { ThreadsHandler } from "./handler";

export const threadsRoutes = (handler: ThreadsHandler): Hapi.ServerRoute[] => [
  {
    method: "POST",
    path: "/threads",
    handler: handler.postThreadHandler,
    options: {
      auth: AUTHENTICATION_STRATEGY.JWT,
    },
  },
  {
    method: "GET",
    path: "/threads/{threadId}",
    handler: handler.getThreadHandler,
  },
];
