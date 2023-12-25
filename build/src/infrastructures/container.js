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
exports.container = void 0;
const jwt_1 = __importDefault(require("@hapi/jwt"));
const Awilix = __importStar(require("awilix"));
const Bcrypt = __importStar(require("bcrypt"));
const nanoid_1 = require("nanoid");
const add_comment_use_case_1 = require("../applications/use-case/add-comment-use-case");
const add_reply_use_case_1 = require("../applications/use-case/add-reply-use-case");
const add_thread_use_case_1 = require("../applications/use-case/add-thread-use-case");
const add_user_use_case_1 = require("../applications/use-case/add-user-use-case");
const delete_authentication_use_case_1 = require("../applications/use-case/delete-authentication-use-case");
const get_thread_detail_use_case_1 = require("../applications/use-case/get-thread-detail-use-case");
const login_user_use_case_1 = require("../applications/use-case/login-user-use-case");
const logout_user_use_case_1 = require("../applications/use-case/logout-user-use-case");
const refresh_authentication_use_case_1 = require("../applications/use-case/refresh-authentication-use-case");
const soft_delete_comment_use_case_1 = require("../applications/use-case/soft-delete-comment-use-case");
const soft_delete_reply_use_case_1 = require("../applications/use-case/soft-delete-reply-use-case");
const toggle_comment_like_use_case_1 = require("../applications/use-case/toggle-comment-like-use-case");
const db_1 = require("./database/postgres/db");
const authentication_repository_postgres_1 = require("./repository/authentication-repository-postgres");
const comment_like_repository_postgres_1 = require("./repository/comment-like-repository-postgres");
const comment_repository_postgres_1 = require("./repository/comment-repository-postgres");
const reply_repository_postgres_1 = require("./repository/reply-repository-postgres");
const thread_repository_postgres_1 = require("./repository/thread-repository-postgres");
const user_repository_postgres_1 = require("./repository/user-repository-postgres");
const password_hash_bcrypt_1 = require("./security/password-hash-bcrypt");
const token_manager_jwt_1 = require("./security/token-manager-jwt");
exports.container = Awilix.createContainer();
exports.container.register({
    // Repository, Service
    db: Awilix.asValue(db_1.db),
    idGenerator: Awilix.asValue(nanoid_1.nanoid),
    bcrypt: Awilix.asValue(Bcrypt),
    jwtToken: Awilix.asValue(jwt_1.default.token),
    userRepository: Awilix.asClass(user_repository_postgres_1.UserRepositoryPostgres).classic(),
    authenticationRepository: Awilix.asClass(authentication_repository_postgres_1.AuthenticationRepositoryPostgres).classic(),
    passwordHash: Awilix.asClass(password_hash_bcrypt_1.PasswordHashBcrypt).classic(),
    authenticationTokenManager: Awilix.asClass(token_manager_jwt_1.TokenManagerJwt).classic(),
    threadRepository: Awilix.asClass(thread_repository_postgres_1.ThreadRepositoryPostgres).classic(),
    commentRepository: Awilix.asClass(comment_repository_postgres_1.CommentRepositoryPostgres).classic(),
    replyRepository: Awilix.asClass(reply_repository_postgres_1.ReplyRepositoryPostgres).classic(),
    commentLikeRepository: Awilix.asClass(comment_like_repository_postgres_1.CommentLikeRepositoryPostgres).classic(),
    // Use Case
    addUserUseCase: Awilix.asClass(add_user_use_case_1.AddUserUseCase).proxy(),
    loginUserUseCase: Awilix.asClass(login_user_use_case_1.LoginUserUseCase).proxy(),
    logoutUserUseCase: Awilix.asClass(logout_user_use_case_1.LogoutUserUseCase).proxy(),
    refreshAuthenticationUseCase: Awilix.asClass(refresh_authentication_use_case_1.RefreshAuthenticationUseCase).proxy(),
    deleteAuthenticationUseCase: Awilix.asClass(delete_authentication_use_case_1.DeleteAuthenticationUseCase).proxy(),
    addThreadUseCase: Awilix.asClass(add_thread_use_case_1.AddThreadUseCase).proxy(),
    addCommentUseCase: Awilix.asClass(add_comment_use_case_1.AddCommentUseCase).proxy(),
    softDeleteCommentUseCase: Awilix.asClass(soft_delete_comment_use_case_1.SoftDeleteCommentUseCase).proxy(),
    addReplyUseCase: Awilix.asClass(add_reply_use_case_1.AddReplyUseCase).proxy(),
    softDeleteReplyUseCase: Awilix.asClass(soft_delete_reply_use_case_1.SoftDeleteReplyUseCase).proxy(),
    getThreadDetailUseCase: Awilix.asClass(get_thread_detail_use_case_1.GetThreadDetailUseCase).proxy(),
    toggleCommentLikeUseCase: Awilix.asClass(toggle_comment_like_use_case_1.ToggleCommentLikeUseCase).proxy(),
});
