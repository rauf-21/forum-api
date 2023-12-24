import * as Hapi from "@hapi/hapi";

import { AUTHENTICATION_STRATEGY } from "../../../../commons/constants/applications/security/authentication-strategy";
import { CommentsHandler } from "./handler";

export const commentsRoutes = (
  handler: CommentsHandler
): Hapi.ServerRoute[] => [
  {
    method: "POST",
    path: "/threads/{threadId}/comments",
    handler: handler.postCommentHandler,
    options: {
      auth: AUTHENTICATION_STRATEGY.JWT,
    },
  },
  {
    method: "DELETE",
    path: "/threads/{threadId}/comments/{commentId}",
    handler: handler.deleteCommentHandler,
    options: {
      auth: AUTHENTICATION_STRATEGY.JWT,
    },
  },
  {
    method: "PUT",
    path: "/threads/{threadId}/comments/{commentId}/likes",
    handler: handler.toggleCommentLikeHandler,
    options: {
      auth: AUTHENTICATION_STRATEGY.JWT,
    },
  },
];
