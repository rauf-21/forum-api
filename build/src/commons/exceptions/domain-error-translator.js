"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainErrorTranslator = void 0;
const authentication_token_manager_error_1 = require("../constants/applications/security/authentication-token-manager-error");
const password_hash_error_1 = require("../constants/applications/security/password-hash-error");
const delete_authentication_use_case_error_1 = require("../constants/applications/use-case/delete-authentication-use-case-error");
const refresh_authentication_use_case_error_1 = require("../constants/applications/use-case/refresh-authentication-use-case-error");
const authentication_repository_error_1 = require("../constants/domains/authentications/authentication-repository-error");
const comment_repository_error_1 = require("../constants/domains/comments/comment-repository-error");
const new_comment_error_1 = require("../constants/domains/comments/new-comment-error");
const new_reply_error_1 = require("../constants/domains/replies/new-reply-error");
const reply_repository_error_1 = require("../constants/domains/replies/reply-repository-error");
const new_thread_error_1 = require("../constants/domains/threads/new-thread-error");
const thread_repository_error_1 = require("../constants/domains/threads/thread-repository-error");
const register_user_error_1 = require("../constants/domains/users/register-user-error");
const user_login_error_1 = require("../constants/domains/users/user-login-error");
const user_repository_error_1 = require("../constants/domains/users/user-repository-error");
const authentication_error_1 = require("./authentication-error");
const authorization_error_1 = require("./authorization-error");
const invariant_error_1 = require("./invariant-error");
const not_found_error_1 = require("./not-found-error");
class DomainErrorTranslator {
    static translate(error) {
        return (this.directories[error.message] || error);
    }
}
exports.DomainErrorTranslator = DomainErrorTranslator;
DomainErrorTranslator.directories = {
    [register_user_error_1.REGISTER_USER_ERROR.MISSING_PROPERTY]: new invariant_error_1.InvariantError(register_user_error_1.REGISTER_USER_ERROR_MESSAGE.MISSING_PROPERTY),
    [register_user_error_1.REGISTER_USER_ERROR.INVALID_DATA_TYPE]: new invariant_error_1.InvariantError(register_user_error_1.REGISTER_USER_ERROR_MESSAGE.INVALID_DATA_TYPE),
    [register_user_error_1.REGISTER_USER_ERROR.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT]: new invariant_error_1.InvariantError(register_user_error_1.REGISTER_USER_ERROR_MESSAGE.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT),
    [register_user_error_1.REGISTER_USER_ERROR.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER]: new invariant_error_1.InvariantError(register_user_error_1.REGISTER_USER_ERROR_MESSAGE.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER),
    [user_login_error_1.USER_LOGIN_ERROR.MISSING_PROPERTY]: new invariant_error_1.InvariantError(user_login_error_1.USER_LOGIN_ERROR_MESSAGE.MISSING_PROPERTY),
    [user_login_error_1.USER_LOGIN_ERROR.INVALID_DATA_TYPE]: new invariant_error_1.InvariantError(user_login_error_1.USER_LOGIN_ERROR_MESSAGE.INVALID_DATA_TYPE),
    [refresh_authentication_use_case_error_1.REFRESH_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN]: new invariant_error_1.InvariantError(refresh_authentication_use_case_error_1.REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN),
    [refresh_authentication_use_case_error_1.REFRESH_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE]: new invariant_error_1.InvariantError(refresh_authentication_use_case_error_1.REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE),
    [delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN]: new invariant_error_1.InvariantError(delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN),
    [delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE]: new invariant_error_1.InvariantError(delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE),
    [new_thread_error_1.NEW_THREAD_ERROR.MISSING_PROPERTY]: new invariant_error_1.InvariantError(new_thread_error_1.NEW_THREAD_ERROR_MESSAGE.MISSING_PROPERTY),
    [new_thread_error_1.NEW_THREAD_ERROR.INVALID_DATA_TYPE]: new invariant_error_1.InvariantError(new_thread_error_1.NEW_THREAD_ERROR_MESSAGE.INVALID_DATA_TYPE),
    [user_repository_error_1.USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND]: new invariant_error_1.InvariantError(user_repository_error_1.USER_REPOSITORY_ERROR_MESSAGE.USERNAME_NOT_FOUND),
    [user_repository_error_1.USER_REPOSITORY_ERROR.USER_NOT_FOUND]: new not_found_error_1.NotFoundError(user_repository_error_1.USER_REPOSITORY_ERROR_MESSAGE.USER_NOT_FOUND),
    [password_hash_error_1.PASSWORD_HASH_ERROR.INCORRECT_CREDENTIALS]: new authentication_error_1.AuthenticationError(password_hash_error_1.PASSWORD_HASH_ERROR_MESSAGE.INCORRECT_CREDENTIALS),
    [authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR.INVALID_REFRESH_TOKEN]: new invariant_error_1.InvariantError(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR_MESSAGE.INVALID_REFRESH_TOKEN),
    [authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.REFRESH_TOKEN_NOT_FOUND]: new invariant_error_1.InvariantError(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR_MESSAGE.REFRESH_TOKEN_NOT_FOUND),
    [new_comment_error_1.NEW_COMMENT_ERROR.MISSING_PROPERTY]: new invariant_error_1.InvariantError(new_comment_error_1.NEW_COMMENT_ERROR_MESSAGE.MISSING_PROPERTY),
    [new_comment_error_1.NEW_COMMENT_ERROR.INVALID_DATA_TYPE]: new invariant_error_1.InvariantError(new_comment_error_1.NEW_COMMENT_ERROR_MESSAGE.INVALID_DATA_TYPE),
    [thread_repository_error_1.THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND]: new not_found_error_1.NotFoundError(thread_repository_error_1.THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND),
    [comment_repository_error_1.COMMENT_REPOSITORY_ERROR.UNAUTHORIZED_COMMENT_DELETION]: new authorization_error_1.AuthorizationError(comment_repository_error_1.COMMENT_REPOSITORY_ERROR_MESSAGE.UNAUTHORIZED_COMMENT_DELETION),
    [comment_repository_error_1.COMMENT_REPOSITORY_ERROR.COMMENT_NOT_FOUND]: new not_found_error_1.NotFoundError(comment_repository_error_1.COMMENT_REPOSITORY_ERROR_MESSAGE.COMMENT_NOT_FOUND),
    [new_reply_error_1.NEW_REPLY_ERROR.MISSING_PROPERTY]: new invariant_error_1.InvariantError(new_reply_error_1.NEW_REPLY_ERROR_MESSAGE.MISSING_PROPERTY),
    [new_reply_error_1.NEW_REPLY_ERROR.INVALID_DATA_TYPE]: new invariant_error_1.InvariantError(new_reply_error_1.NEW_REPLY_ERROR_MESSAGE.INVALID_DATA_TYPE),
    [reply_repository_error_1.REPLY_REPOSITORY_ERROR.UNAUTHORIZED_REPLY_DELETION]: new authorization_error_1.AuthorizationError(reply_repository_error_1.REPLY_REPOSITORY_ERROR_MESSAGE.UNAUTHORIZED_REPLY_DELETION),
    [reply_repository_error_1.REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND]: new not_found_error_1.NotFoundError(reply_repository_error_1.REPLY_REPOSITORY_ERROR_MESSAGE.REPLY_NOT_FOUND),
};
