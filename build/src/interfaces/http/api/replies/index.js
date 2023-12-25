"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repliesPlugin = void 0;
const handler_1 = require("./handler");
const routes_1 = require("./routes");
exports.repliesPlugin = {
    name: "replies",
    register(server, options) {
        const { addReplyUseCase, softDeleteReplyUseCase } = options;
        const repliesHandler = new handler_1.RepliesHandler({
            addReplyUseCase,
            softDeleteReplyUseCase,
        });
        server.route((0, routes_1.repliesRoutes)(repliesHandler));
    },
};
