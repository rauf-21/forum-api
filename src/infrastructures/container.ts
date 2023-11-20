import Jwt from "@hapi/jwt";
import * as Awilix from "awilix";
import * as Bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import { AuthenticationTokenManager } from "../applications/security/authentication-token-manager";
import { PasswordHash } from "../applications/security/password-hash";
import { AddCommentUseCase } from "../applications/use-case/add-comment-use-case";
import { AddReplyUseCase } from "../applications/use-case/add-reply-use-case";
import { AddThreadUseCase } from "../applications/use-case/add-thread-use-case";
import { AddUserUseCase } from "../applications/use-case/add-user-use-case";
import { DeleteAuthenticationUseCase } from "../applications/use-case/delete-authentication-use-case";
import { GetThreadDetailUseCase } from "../applications/use-case/get-thread-detail-use-case";
import { LoginUserUseCase } from "../applications/use-case/login-user-use-case";
import { LogoutUserUseCase } from "../applications/use-case/logout-user-use-case";
import { RefreshAuthenticationUseCase } from "../applications/use-case/refresh-authentication-use-case";
import { SoftDeleteCommentUseCase } from "../applications/use-case/soft-delete-comment-use-case";
import { SoftDeleteReplyUseCase } from "../applications/use-case/soft-delete-reply-use-case";
import { AuthenticationRepository } from "../domains/authentications/authentication-repository";
import { CommentRepository } from "../domains/comments/comment-repository";
import { ReplyRepository } from "../domains/replies/reply-repository";
import { ThreadRepository } from "../domains/threads/thread-repository";
import { UserRepository } from "../domains/users/user-repository";
import { db } from "./database/postgres/db";
import { AuthenticationRepositoryPostgres } from "./repository/authentication-repository-postgres";
import { CommentRepositoryPostgres } from "./repository/comment-repository-postgres";
import { ReplyRepositoryPostgres } from "./repository/reply-repository-postgres";
import { ThreadRepositoryPostgres } from "./repository/thread-repository-postgres";
import { UserRepositoryPostgres } from "./repository/user-repository-postgres";
import { PasswordHashBcrypt } from "./security/password-hash-bcrypt";
import { TokenManagerJwt } from "./security/token-manager-jwt";

interface Cradle {
  // Repository, Service
  db: typeof db;
  idGenerator: typeof nanoid;
  bcrypt: typeof Bcrypt;
  jwtToken: typeof Jwt.token;
  userRepository: UserRepository;
  authenticationRepository: AuthenticationRepository;
  passwordHash: PasswordHash;
  authenticationTokenManager: AuthenticationTokenManager;
  threadRepository: ThreadRepository;
  commentRepository: CommentRepository;
  replyRepository: ReplyRepository;
  // Use Case
  addUserUseCase: AddUserUseCase;
  loginUserUseCase: LoginUserUseCase;
  logoutUserUseCase: LogoutUserUseCase;
  refreshAuthenticationUseCase: RefreshAuthenticationUseCase;
  deleteAuthenticationUseCase: DeleteAuthenticationUseCase;
  addThreadUseCase: AddThreadUseCase;
  addCommentUseCase: AddCommentUseCase;
  softDeleteCommentUseCase: SoftDeleteCommentUseCase;
  addReplyUseCase: AddReplyUseCase;
  softDeleteReplyUseCase: SoftDeleteReplyUseCase;
  getThreadDetailUseCase: GetThreadDetailUseCase;
}

export const container = Awilix.createContainer<Cradle>();

container.register({
  // Repository, Service
  db: Awilix.asValue(db),
  idGenerator: Awilix.asValue(nanoid),
  bcrypt: Awilix.asValue(Bcrypt),
  jwtToken: Awilix.asValue(Jwt.token),
  userRepository: Awilix.asClass(UserRepositoryPostgres).classic(),
  authenticationRepository: Awilix.asClass(
    AuthenticationRepositoryPostgres
  ).classic(),
  passwordHash: Awilix.asClass(PasswordHashBcrypt).classic(),
  authenticationTokenManager: Awilix.asClass(TokenManagerJwt).classic(),
  threadRepository: Awilix.asClass(ThreadRepositoryPostgres).classic(),
  commentRepository: Awilix.asClass(CommentRepositoryPostgres).classic(),
  replyRepository: Awilix.asClass(ReplyRepositoryPostgres).classic(),
  // Use Case
  addUserUseCase: Awilix.asClass(AddUserUseCase).proxy(),
  loginUserUseCase: Awilix.asClass(LoginUserUseCase).proxy(),
  logoutUserUseCase: Awilix.asClass(LogoutUserUseCase).proxy(),
  refreshAuthenticationUseCase: Awilix.asClass(
    RefreshAuthenticationUseCase
  ).proxy(),
  deleteAuthenticationUseCase: Awilix.asClass(
    DeleteAuthenticationUseCase
  ).proxy(),
  addThreadUseCase: Awilix.asClass(AddThreadUseCase).proxy(),
  addCommentUseCase: Awilix.asClass(AddCommentUseCase).proxy(),
  softDeleteCommentUseCase: Awilix.asClass(SoftDeleteCommentUseCase).proxy(),
  addReplyUseCase: Awilix.asClass(AddReplyUseCase).proxy(),
  softDeleteReplyUseCase: Awilix.asClass(SoftDeleteReplyUseCase).proxy(),
  getThreadDetailUseCase: Awilix.asClass(GetThreadDetailUseCase).proxy(),
});
