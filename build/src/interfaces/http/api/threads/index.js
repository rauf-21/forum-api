"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.threadsPlugin = void 0;
const handler_1 = require("./handler");
const routes_1 = require("./routes");
exports.threadsPlugin = {
    name: "threads",
    register(server, options) {
        const { addThreadUseCase, getThreadDetailUseCase } = options;
        const threadsHandler = new handler_1.ThreadsHandler({
            addThreadUseCase,
            getThreadDetailUseCase,
        });
        server.route((0, routes_1.threadsRoutes)(threadsHandler));
    },
};
