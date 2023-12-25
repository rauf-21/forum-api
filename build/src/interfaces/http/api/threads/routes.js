"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.threadsRoutes = void 0;
const authentication_strategy_1 = require("../../../../commons/constants/applications/security/authentication-strategy");
const threadsRoutes = (handler) => [
    {
        method: "POST",
        path: "/threads",
        handler: handler.postThreadHandler,
        options: {
            auth: authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT,
        },
    },
    {
        method: "GET",
        path: "/threads/{threadId}",
        handler: handler.getThreadHandler,
    },
];
exports.threadsRoutes = threadsRoutes;
