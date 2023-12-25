"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsPlugin = void 0;
const handler_1 = require("./handler");
const routes_1 = require("./routes");
exports.commentsPlugin = {
    name: "comments",
    register(server, options) {
        const { addCommentUseCase, softDeleteCommentUseCase } = options;
        const commentsHandler = new handler_1.CommentsHandler({
            addCommentUseCase,
            softDeleteCommentUseCase,
        });
        server.route((0, routes_1.commentsRoutes)(commentsHandler));
    },
};
