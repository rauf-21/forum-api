"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repliesRoutes = void 0;
const authentication_strategy_1 = require("../../../../commons/constants/applications/security/authentication-strategy");
const repliesRoutes = (handler) => [
    {
        method: "POST",
        path: "/threads/{threadId}/comments/{commentId}/replies",
        handler: handler.postReplyHandler,
        options: {
            auth: authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT,
        },
    },
    {
        method: "DELETE",
        path: "/threads/{threadId}/comments/{commentId}/replies/{replyId}",
        handler: handler.deleteReplyHandler,
        options: {
            auth: authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT,
        },
    },
];
exports.repliesRoutes = repliesRoutes;
