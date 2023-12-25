"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const usersRoutes = (handler) => [
    {
        method: "POST",
        path: "/users",
        handler: handler.postUserHandler,
    },
];
exports.usersRoutes = usersRoutes;
