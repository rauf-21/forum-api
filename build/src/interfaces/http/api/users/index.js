"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersPlugin = void 0;
const handler_1 = require("./handler");
const routes_1 = require("./routes");
exports.usersPlugin = {
    name: "users",
    register(server, options) {
        const { addUserUseCase } = options;
        const usersHandler = new handler_1.UsersHandler({ addUserUseCase });
        const routes = (0, routes_1.usersRoutes)(usersHandler);
        server.route(routes);
    },
};
