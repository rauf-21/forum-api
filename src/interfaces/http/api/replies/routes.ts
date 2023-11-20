import * as Hapi from "@hapi/hapi";

import { AUTHENTICATION_STRATEGY } from "../../../../commons/constants/applications/security/authentication-strategy";
import { RepliesHandler } from "./handler";

export const repliesRoutes = (handler: RepliesHandler): Hapi.ServerRoute[] => [
  {
    method: "POST",
    path: "/threads/{threadId}/comments/{commentId}/replies",
    handler: handler.postReplyHandler,
    options: {
      auth: AUTHENTICATION_STRATEGY.JWT,
    },
  },
  {
    method: "DELETE",
    path: "/threads/{threadId}/comments/{commentId}/replies/{replyId}",
    handler: handler.deleteReplyHandler,
    options: {
      auth: AUTHENTICATION_STRATEGY.JWT,
    },
  },
];
