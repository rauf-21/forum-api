"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
const container_1 = require("./infrastructures/container");
const create_server_1 = require("./infrastructures/http/create-server");
async function start() {
    const addUserUseCase = container_1.container.resolve("addUserUseCase");
    const loginUserUseCase = container_1.container.resolve("loginUserUseCase");
    const logoutUserUseCase = container_1.container.resolve("logoutUserUseCase");
    const refreshAuthenticationUseCase = container_1.container.resolve("refreshAuthenticationUseCase");
    const addThreadUseCase = container_1.container.resolve("addThreadUseCase");
    const addCommentUseCase = container_1.container.resolve("addCommentUseCase");
    const softDeleteCommentUseCase = container_1.container.resolve("softDeleteCommentUseCase");
    const addReplyUseCase = container_1.container.resolve("addReplyUseCase");
    const softDeleteReplyUseCase = container_1.container.resolve("softDeleteReplyUseCase");
    const getThreadDetailUseCase = container_1.container.resolve("getThreadDetailUseCase");
    const toggleCommentLikeUseCase = container_1.container.resolve("toggleCommentLikeUseCase");
    const server = await (0, create_server_1.createServer)({
        addUserUseCase,
        loginUserUseCase,
        logoutUserUseCase,
        refreshAuthenticationUseCase,
        addThreadUseCase,
        addCommentUseCase,
        softDeleteCommentUseCase,
        addReplyUseCase,
        softDeleteReplyUseCase,
        getThreadDetailUseCase,
        toggleCommentLikeUseCase,
    });
    await server.start();
    // eslint-disable-next-line no-console
    console.log(`Server start at ${server.info.uri}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
