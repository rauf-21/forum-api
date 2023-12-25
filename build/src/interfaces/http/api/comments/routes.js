"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRoutes = void 0;
const authentication_strategy_1 = require("../../../../commons/constants/applications/security/authentication-strategy");
const commentsRoutes = (handler) => [
    {
        method: "POST",
        path: "/threads/{threadId}/comments",
        handler: handler.postCommentHandler,
        options: {
            auth: authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT,
        },
    },
    {
        method: "DELETE",
        path: "/threads/{threadId}/comments/{commentId}",
        handler: handler.deleteCommentHandler,
        options: {
            auth: authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT,
        },
    },
];
exports.commentsRoutes = commentsRoutes;
