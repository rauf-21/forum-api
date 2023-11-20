import {
  AUTHENTICATION_TOKEN_MANAGER_ERROR,
  AUTHENTICATION_TOKEN_MANAGER_ERROR_MESSAGE,
} from "../constants/applications/security/authentication-token-manager-error";
import {
  PASSWORD_HASH_ERROR,
  PASSWORD_HASH_ERROR_MESSAGE,
} from "../constants/applications/security/password-hash-error";
import {
  DELETE_AUTHENTICATION_USE_CASE_ERROR,
  DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE,
} from "../constants/applications/use-case/delete-authentication-use-case-error";
import {
  REFRESH_AUTHENTICATION_USE_CASE_ERROR,
  REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE,
} from "../constants/applications/use-case/refresh-authentication-use-case-error";
import {
  AUTHENTICATION_REPOSITORY_ERROR,
  AUTHENTICATION_REPOSITORY_ERROR_MESSAGE,
} from "../constants/domains/authentications/authentication-repository-error";
import {
  COMMENT_REPOSITORY_ERROR,
  COMMENT_REPOSITORY_ERROR_MESSAGE,
} from "../constants/domains/comments/comment-repository-error";
import {
  NEW_COMMENT_ERROR,
  NEW_COMMENT_ERROR_MESSAGE,
} from "../constants/domains/comments/new-comment-error";
import {
  NEW_REPLY_ERROR,
  NEW_REPLY_ERROR_MESSAGE,
} from "../constants/domains/replies/new-reply-error";
import {
  REPLY_REPOSITORY_ERROR,
  REPLY_REPOSITORY_ERROR_MESSAGE,
} from "../constants/domains/replies/reply-repository-error";
import {
  NEW_THREAD_ERROR,
  NEW_THREAD_ERROR_MESSAGE,
} from "../constants/domains/threads/new-thread-error";
import {
  THREAD_REPOSITORY_ERROR,
  THREAD_REPOSITORY_ERROR_MESSAGE,
} from "../constants/domains/threads/thread-repository-error";
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_ERROR_MESSAGE,
} from "../constants/domains/users/register-user-error";
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_ERROR_MESSAGE,
} from "../constants/domains/users/user-login-error";
import {
  USER_REPOSITORY_ERROR,
  USER_REPOSITORY_ERROR_MESSAGE,
} from "../constants/domains/users/user-repository-error";
import { AuthenticationError } from "./authentication-error";
import { AuthorizationError } from "./authorization-error";
import { InvariantError } from "./invariant-error";
import { NotFoundError } from "./not-found-error";

export class DomainErrorTranslator {
  static readonly directories = {
    [REGISTER_USER_ERROR.MISSING_PROPERTY]: new InvariantError(
      REGISTER_USER_ERROR_MESSAGE.MISSING_PROPERTY
    ),
    [REGISTER_USER_ERROR.INVALID_DATA_TYPE]: new InvariantError(
      REGISTER_USER_ERROR_MESSAGE.INVALID_DATA_TYPE
    ),
    [REGISTER_USER_ERROR.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT]:
      new InvariantError(
        REGISTER_USER_ERROR_MESSAGE.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT
      ),
    [REGISTER_USER_ERROR.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER]:
      new InvariantError(
        REGISTER_USER_ERROR_MESSAGE.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER
      ),
    [USER_LOGIN_ERROR.MISSING_PROPERTY]: new InvariantError(
      USER_LOGIN_ERROR_MESSAGE.MISSING_PROPERTY
    ),
    [USER_LOGIN_ERROR.INVALID_DATA_TYPE]: new InvariantError(
      USER_LOGIN_ERROR_MESSAGE.INVALID_DATA_TYPE
    ),
    [REFRESH_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN]:
      new InvariantError(
        REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN
      ),
    [REFRESH_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE]:
      new InvariantError(
        REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE
      ),
    [DELETE_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN]:
      new InvariantError(
        DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN
      ),
    [DELETE_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE]:
      new InvariantError(
        DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE
      ),
    [NEW_THREAD_ERROR.MISSING_PROPERTY]: new InvariantError(
      NEW_THREAD_ERROR_MESSAGE.MISSING_PROPERTY
    ),
    [NEW_THREAD_ERROR.INVALID_DATA_TYPE]: new InvariantError(
      NEW_THREAD_ERROR_MESSAGE.INVALID_DATA_TYPE
    ),
    [USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND]: new InvariantError(
      USER_REPOSITORY_ERROR_MESSAGE.USERNAME_NOT_FOUND
    ),
    [USER_REPOSITORY_ERROR.USER_NOT_FOUND]: new NotFoundError(
      USER_REPOSITORY_ERROR_MESSAGE.USER_NOT_FOUND
    ),
    [PASSWORD_HASH_ERROR.INCORRECT_CREDENTIALS]: new AuthenticationError(
      PASSWORD_HASH_ERROR_MESSAGE.INCORRECT_CREDENTIALS
    ),
    [AUTHENTICATION_TOKEN_MANAGER_ERROR.INVALID_REFRESH_TOKEN]:
      new InvariantError(
        AUTHENTICATION_TOKEN_MANAGER_ERROR_MESSAGE.INVALID_REFRESH_TOKEN
      ),
    [AUTHENTICATION_REPOSITORY_ERROR.REFRESH_TOKEN_NOT_FOUND]:
      new InvariantError(
        AUTHENTICATION_REPOSITORY_ERROR_MESSAGE.REFRESH_TOKEN_NOT_FOUND
      ),
    [NEW_COMMENT_ERROR.MISSING_PROPERTY]: new InvariantError(
      NEW_COMMENT_ERROR_MESSAGE.MISSING_PROPERTY
    ),
    [NEW_COMMENT_ERROR.INVALID_DATA_TYPE]: new InvariantError(
      NEW_COMMENT_ERROR_MESSAGE.INVALID_DATA_TYPE
    ),
    [THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND]: new NotFoundError(
      THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND
    ),
    [COMMENT_REPOSITORY_ERROR.UNAUTHORIZED_COMMENT_DELETION]:
      new AuthorizationError(
        COMMENT_REPOSITORY_ERROR_MESSAGE.UNAUTHORIZED_COMMENT_DELETION
      ),
    [COMMENT_REPOSITORY_ERROR.COMMENT_NOT_FOUND]: new NotFoundError(
      COMMENT_REPOSITORY_ERROR_MESSAGE.COMMENT_NOT_FOUND
    ),
    [NEW_REPLY_ERROR.MISSING_PROPERTY]: new InvariantError(
      NEW_REPLY_ERROR_MESSAGE.MISSING_PROPERTY
    ),
    [NEW_REPLY_ERROR.INVALID_DATA_TYPE]: new InvariantError(
      NEW_REPLY_ERROR_MESSAGE.INVALID_DATA_TYPE
    ),
    [REPLY_REPOSITORY_ERROR.UNAUTHORIZED_REPLY_DELETION]:
      new AuthorizationError(
        REPLY_REPOSITORY_ERROR_MESSAGE.UNAUTHORIZED_REPLY_DELETION
      ),
    [REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND]: new NotFoundError(
      REPLY_REPOSITORY_ERROR_MESSAGE.REPLY_NOT_FOUND
    ),
  };

  static translate(error: Error) {
    return (
      this.directories[error.message as keyof typeof this.directories] || error
    );
  }
}
