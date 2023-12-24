import * as Hapi from "@hapi/hapi";
import Jwt from "@hapi/jwt";

import { AddCommentUseCase } from "../../applications/use-case/add-comment-use-case";
import { AddReplyUseCase } from "../../applications/use-case/add-reply-use-case";
import { AddThreadUseCase } from "../../applications/use-case/add-thread-use-case";
import { AddUserUseCase } from "../../applications/use-case/add-user-use-case";
import { GetThreadDetailUseCase } from "../../applications/use-case/get-thread-detail-use-case";
import { LoginUserUseCase } from "../../applications/use-case/login-user-use-case";
import { LogoutUserUseCase } from "../../applications/use-case/logout-user-use-case";
import { RefreshAuthenticationUseCase } from "../../applications/use-case/refresh-authentication-use-case";
import { SoftDeleteCommentUseCase } from "../../applications/use-case/soft-delete-comment-use-case";
import { SoftDeleteReplyUseCase } from "../../applications/use-case/soft-delete-reply-use-case";
import { AUTHENTICATION_STRATEGY } from "../../commons/constants/applications/security/authentication-strategy";
import { HOST, PORT } from "../../commons/constants/infrastructures/http";
import { ClientError } from "../../commons/exceptions/client-error";
import { DomainErrorTranslator } from "../../commons/exceptions/domain-error-translator";
import { authenticationsPlugin } from "../../interfaces/http/api/authentications";
import { commentsPlugin } from "../../interfaces/http/api/comments";
import { repliesPlugin } from "../../interfaces/http/api/replies";
import { threadsPlugin } from "../../interfaces/http/api/threads";
import { usersPlugin } from "../../interfaces/http/api/users";
import { AuthenticationStrategyJwt } from "../security/authentication-strategy-jwt";

export interface CreateServerDependencies {
  addUserUseCase: AddUserUseCase;
  loginUserUseCase: LoginUserUseCase;
  logoutUserUseCase: LogoutUserUseCase;
  refreshAuthenticationUseCase: RefreshAuthenticationUseCase;
  addThreadUseCase: AddThreadUseCase;
  addCommentUseCase: AddCommentUseCase;
  softDeleteCommentUseCase: SoftDeleteCommentUseCase;
  addReplyUseCase: AddReplyUseCase;
  softDeleteReplyUseCase: SoftDeleteReplyUseCase;
  getThreadDetailUseCase: GetThreadDetailUseCase;
}

export async function createServer(dependencies: CreateServerDependencies) {
  const {
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
  } = dependencies;

  const server = Hapi.server({
    host: HOST,
    port: PORT,
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  const { name, scheme, options } = new AuthenticationStrategyJwt(
    AUTHENTICATION_STRATEGY.JWT
  );

  server.auth.strategy(name, scheme, options);

  await server.register([
    {
      plugin: usersPlugin,
      options: { addUserUseCase },
    },
    {
      plugin: authenticationsPlugin,
      options: {
        loginUserUseCase,
        logoutUserUseCase,
        refreshAuthenticationUseCase,
      },
    },
    {
      plugin: threadsPlugin,
      options: { addThreadUseCase, getThreadDetailUseCase },
    },
    {
      plugin: commentsPlugin,
      options: { addCommentUseCase, softDeleteCommentUseCase },
    },
    {
      plugin: repliesPlugin,
      options: { addReplyUseCase, softDeleteReplyUseCase },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);

      if (translatedError instanceof ClientError) {
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
