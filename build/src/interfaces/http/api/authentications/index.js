"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationsPlugin = void 0;
const handler_1 = require("./handler");
const routes_1 = require("./routes");
exports.authenticationsPlugin = {
    name: "authentications",
    register(server, options) {
        const { loginUserUseCase, logoutUserUseCase, refreshAuthenticationUseCase, } = options;
        const authenticationsHandler = new handler_1.AuthenticationsHandler({
            loginUserUseCase,
            logoutUserUseCase,
            refreshAuthenticationUseCase,
        });
        const routes = (0, routes_1.authenticationsRoutes)(authenticationsHandler);
        server.route(routes);
    },
};
