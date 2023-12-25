"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationsRoutes = void 0;
const authenticationsRoutes = (handler) => [
    {
        method: "POST",
        path: "/authentications",
        handler: handler.postAuhenticationHandler,
    },
    {
        method: "PUT",
        path: "/authentications",
        handler: handler.putAuthenticationHandler,
    },
    {
        method: "DELETE",
        path: "/authentications",
        handler: handler.deleteAuthenticationHandler,
    },
];
exports.authenticationsRoutes = authenticationsRoutes;
