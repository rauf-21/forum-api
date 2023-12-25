"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const Hapi = __importStar(require("@hapi/hapi"));
const jwt_1 = __importDefault(require("@hapi/jwt"));
const authentication_strategy_1 = require("../../commons/constants/applications/security/authentication-strategy");
const http_1 = require("../../commons/constants/infrastructures/http");
const client_error_1 = require("../../commons/exceptions/client-error");
const domain_error_translator_1 = require("../../commons/exceptions/domain-error-translator");
const authentications_1 = require("../../interfaces/http/api/authentications");
const comments_1 = require("../../interfaces/http/api/comments");
const replies_1 = require("../../interfaces/http/api/replies");
const threads_1 = require("../../interfaces/http/api/threads");
const users_1 = require("../../interfaces/http/api/users");
const authentication_strategy_jwt_1 = require("../security/authentication-strategy-jwt");
async function createServer(dependencies) {
    const { addUserUseCase, loginUserUseCase, logoutUserUseCase, refreshAuthenticationUseCase, addThreadUseCase, addCommentUseCase, softDeleteCommentUseCase, addReplyUseCase, softDeleteReplyUseCase, getThreadDetailUseCase, toggleCommentLikeUseCase, } = dependencies;
    const server = Hapi.server({
        host: http_1.HOST,
        port: http_1.PORT,
    });
    await server.register([
        {
            plugin: jwt_1.default,
        },
    ]);
    const { name, scheme, options } = new authentication_strategy_jwt_1.AuthenticationStrategyJwt(authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT);
    server.auth.strategy(name, scheme, options);
    await server.register([
        {
            plugin: users_1.usersPlugin,
            options: { addUserUseCase },
        },
        {
            plugin: authentications_1.authenticationsPlugin,
            options: {
                loginUserUseCase,
                logoutUserUseCase,
                refreshAuthenticationUseCase,
            },
        },
        {
            plugin: threads_1.threadsPlugin,
            options: { addThreadUseCase, getThreadDetailUseCase },
        },
        {
            plugin: comments_1.commentsPlugin,
            options: {
                addCommentUseCase,
                softDeleteCommentUseCase,
                toggleCommentLikeUseCase,
            },
        },
        {
            plugin: replies_1.repliesPlugin,
            options: { addReplyUseCase, softDeleteReplyUseCase },
        },
    ]);
    server.ext("onPreResponse", (request, h) => {
        const { response } = request;
        if (response instanceof Error) {
            const translatedError = domain_error_translator_1.DomainErrorTranslator.translate(response);
            if (translatedError instanceof client_error_1.ClientError) {
                return h
                    .response({
                    status: "fail",
                    message: translatedError.message,
                })
                    .code(translatedError.statusCode);
            }
            if (!response.isServer) {
                return h.continue;
            }
            return h
                .response({
                status: "error",
                message: "something went wrong on the server",
            })
                .code(500);
        }
        return h.continue;
    });
    return server;
}
exports.createServer = createServer;
