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
import { DomainErrorTranslator } from "./domain-error-translator";
import { InvariantError } from "./invariant-error";
import { NotFoundError } from "./not-found-error";

describe("DomainErrorTranslator", () => {
  it("should translate the error correctly", () => {
    expect(
      DomainErrorTranslator.translate(
        new Error(REGISTER_USER_ERROR.MISSING_PROPERTY)
      )
    ).toStrictEqual(
      new InvariantError(REGISTER_USER_ERROR_MESSAGE.MISSING_PROPERTY)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(REGISTER_USER_ERROR.INVALID_DATA_TYPE)
      )
    ).toStrictEqual(
      new InvariantError(REGISTER_USER_ERROR_MESSAGE.INVALID_DATA_TYPE)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(REGISTER_USER_ERROR.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT)
      )
    ).toStrictEqual(
      new InvariantError(
        REGISTER_USER_ERROR_MESSAGE.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(REGISTER_USER_ERROR.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER)
      )
    ).toStrictEqual(
      new InvariantError(
        REGISTER_USER_ERROR_MESSAGE.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(USER_LOGIN_ERROR.MISSING_PROPERTY)
      )
    ).toStrictEqual(
      new InvariantError(USER_LOGIN_ERROR_MESSAGE.MISSING_PROPERTY)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(USER_LOGIN_ERROR.INVALID_DATA_TYPE)
      )
    ).toStrictEqual(
      new InvariantError(USER_LOGIN_ERROR_MESSAGE.INVALID_DATA_TYPE)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(REFRESH_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN)
      )
    ).toStrictEqual(
      new InvariantError(
        REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(
          REFRESH_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE
        )
      )
    ).toStrictEqual(
      new InvariantError(
        REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(DELETE_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN)
      )
    ).toStrictEqual(
      new InvariantError(
        DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(
          DELETE_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE
        )
      )
    ).toStrictEqual(
      new InvariantError(
        DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(NEW_THREAD_ERROR.MISSING_PROPERTY)
      )
    ).toStrictEqual(
      new InvariantError(NEW_THREAD_ERROR_MESSAGE.MISSING_PROPERTY)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(NEW_THREAD_ERROR.INVALID_DATA_TYPE)
      )
    ).toStrictEqual(
      new InvariantError(NEW_THREAD_ERROR_MESSAGE.INVALID_DATA_TYPE)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND)
      )
    ).toStrictEqual(
      new InvariantError(USER_REPOSITORY_ERROR_MESSAGE.USERNAME_NOT_FOUND)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(USER_REPOSITORY_ERROR.USER_NOT_FOUND)
      )
    ).toStrictEqual(
      new NotFoundError(USER_REPOSITORY_ERROR_MESSAGE.USER_NOT_FOUND)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(PASSWORD_HASH_ERROR.INCORRECT_CREDENTIALS)
      )
    ).toStrictEqual(
      new AuthenticationError(PASSWORD_HASH_ERROR_MESSAGE.INCORRECT_CREDENTIALS)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(AUTHENTICATION_TOKEN_MANAGER_ERROR.INVALID_REFRESH_TOKEN)
      )
    ).toStrictEqual(
      new InvariantError(
        AUTHENTICATION_TOKEN_MANAGER_ERROR_MESSAGE.INVALID_REFRESH_TOKEN
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(AUTHENTICATION_REPOSITORY_ERROR.REFRESH_TOKEN_NOT_FOUND)
      )
    ).toStrictEqual(
      new InvariantError(
        AUTHENTICATION_REPOSITORY_ERROR_MESSAGE.REFRESH_TOKEN_NOT_FOUND
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(NEW_COMMENT_ERROR.MISSING_PROPERTY)
      )
    ).toStrictEqual(
      new InvariantError(NEW_COMMENT_ERROR_MESSAGE.MISSING_PROPERTY)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(NEW_COMMENT_ERROR.INVALID_DATA_TYPE)
      )
    ).toStrictEqual(
      new InvariantError(NEW_COMMENT_ERROR_MESSAGE.INVALID_DATA_TYPE)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND)
      )
    ).toStrictEqual(
      new NotFoundError(THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(COMMENT_REPOSITORY_ERROR.UNAUTHORIZED_COMMENT_DELETION)
      )
    ).toStrictEqual(
      new AuthorizationError(
        COMMENT_REPOSITORY_ERROR_MESSAGE.UNAUTHORIZED_COMMENT_DELETION
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(COMMENT_REPOSITORY_ERROR.COMMENT_NOT_FOUND)
      )
    ).toStrictEqual(
      new NotFoundError(COMMENT_REPOSITORY_ERROR_MESSAGE.COMMENT_NOT_FOUND)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(NEW_REPLY_ERROR.MISSING_PROPERTY)
      )
    ).toStrictEqual(
      new InvariantError(NEW_REPLY_ERROR_MESSAGE.MISSING_PROPERTY)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(NEW_REPLY_ERROR.INVALID_DATA_TYPE)
      )
    ).toStrictEqual(
      new InvariantError(NEW_REPLY_ERROR_MESSAGE.INVALID_DATA_TYPE)
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(REPLY_REPOSITORY_ERROR.UNAUTHORIZED_REPLY_DELETION)
      )
    ).toStrictEqual(
      new AuthorizationError(
        REPLY_REPOSITORY_ERROR_MESSAGE.UNAUTHORIZED_REPLY_DELETION
      )
    );
    expect(
      DomainErrorTranslator.translate(
        new Error(REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND)
      )
    ).toStrictEqual(
      new NotFoundError(REPLY_REPOSITORY_ERROR_MESSAGE.REPLY_NOT_FOUND)
    );
  });

  it("should return the original error when an error message is not needed to translate", () => {
    const error = new Error("some_error_message");

    const translatedError = DomainErrorTranslator.translate(error);

    expect(translatedError).toStrictEqual(error);
  });
});
