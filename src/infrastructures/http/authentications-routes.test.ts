import { AuthenticationsTableTestHelper } from "../../../tests/authentications-table-test-helper";
import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { AUTHENTICATION_TOKEN_MANAGER_ERROR_MESSAGE } from "../../commons/constants/applications/security/authentication-token-manager-error";
import { PASSWORD_HASH_ERROR_MESSAGE } from "../../commons/constants/applications/security/password-hash-error";
import { DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE } from "../../commons/constants/applications/use-case/delete-authentication-use-case-error";
import { REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE } from "../../commons/constants/applications/use-case/refresh-authentication-use-case-error";
import { AUTHENTICATION_REPOSITORY_ERROR_MESSAGE } from "../../commons/constants/domains/authentications/authentication-repository-error";
import { USER_LOGIN_ERROR_MESSAGE } from "../../commons/constants/domains/users/user-login-error";
import { USER_REPOSITORY_ERROR_MESSAGE } from "../../commons/constants/domains/users/user-repository-error";
import { container } from "../container";
import { db } from "../database/postgres/db";
import { createServer, CreateServerDependencies } from "./create-server";

describe("/authentications endpoint", () => {
  const addUserUseCase = container.resolve("addUserUseCase");

  const loginUserUseCase = container.resolve("loginUserUseCase");

  const logoutUserUseCase = container.resolve("logoutUserUseCase");

  const refreshAuthenticationUseCase = container.resolve(
    "refreshAuthenticationUseCase"
  );

  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe("when POST /authentications", () => {
    it("should have a response with a 201 status code and return new authentication", async () => {
      const requestPayload = {
        username: "dicoding",
        password: "secret",
      };

      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });

      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });

    it("should have a response with a 400 status code if the payload has missing property", async () => {
      const requestPayload = {
        username: "dicoding",
      };

      const server = await createServer({
        loginUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        USER_LOGIN_ERROR_MESSAGE.MISSING_PROPERTY
      );
    });

    it("should have a response with a 400 status code if the payload has an invalid data type", async () => {
      const requestPayload = {
        username: 123,
        password: "secret",
      };

      const server = await createServer({
        loginUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        USER_LOGIN_ERROR_MESSAGE.INVALID_DATA_TYPE
      );
    });

    it("should have a response with a 400 status code if the username is not found", async () => {
      const requestPayload = {
        username: "dicoding",
        password: "secret",
      };

      const server = await createServer({
        loginUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        USER_REPOSITORY_ERROR_MESSAGE.USERNAME_NOT_FOUND
      );
    });

    it("should have a response with a 401 status code if the password is incorrect", async () => {
      const requestPayload = {
        username: "dicoding",
        password: "wrong_password",
      };

      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });

      const response = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        PASSWORD_HASH_ERROR_MESSAGE.INCORRECT_CREDENTIALS
      );
    });
  });

  describe("when PUT /authentications", () => {
    it("should have a response with a 200 status code and return new access token", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        refreshAuthenticationUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      await server.inject({
        method: "POST",
        url: "/users",
        payload: {
          username: "dicoding",
          password: "secret",
          fullname: "Dicoding Indonesia",
        },
      });

      const loginResponse = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: {
          username: "dicoding",
          password: "secret",
        },
      });

      const {
        data: { refreshToken },
      } = JSON.parse(loginResponse.payload);

      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.accessToken).toBeDefined();
    });

    it("should have a response with a 400 status code if the payload has a missing refresh token", async () => {
      const server = await createServer({
        refreshAuthenticationUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {},
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN
      );
    });

    it("should have a response with a 400 status code if the refresh token is not a string", async () => {
      const server = await createServer({
        refreshAuthenticationUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken: 123,
        },
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE
      );
    });

    it("should have a response with a 400 status code if the refresh token is not valid", async () => {
      const server = await createServer({
        refreshAuthenticationUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken: "invalid_refresh_token",
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        AUTHENTICATION_TOKEN_MANAGER_ERROR_MESSAGE.INVALID_REFRESH_TOKEN
      );
    });

    it("should have a response with a 400 status code if the refresh token is not registered in the database", async () => {
      const server = await createServer({
        refreshAuthenticationUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const refreshToken = await container
        .resolve("authenticationTokenManager")
        .createRefreshToken({ username: "dicoding" });

      const response = await server.inject({
        method: "PUT",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        AUTHENTICATION_REPOSITORY_ERROR_MESSAGE.REFRESH_TOKEN_NOT_FOUND
      );
    });
  });

  describe("when DELETE /authentications", () => {
    it("should have a response with a 200 status code if the refresh token is valid", async () => {
      const server = await createServer({
        logoutUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const refreshToken = "refresh_token";

      await AuthenticationsTableTestHelper.addToken(refreshToken);

      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
    });

    it("should have a response with a 400 status code if the refresh token is not registered in the database", async () => {
      const server = await createServer({
        logoutUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const refreshToken = "refresh_token";

      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          refreshToken,
        },
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        AUTHENTICATION_REPOSITORY_ERROR_MESSAGE.REFRESH_TOKEN_NOT_FOUND
      );
    });

    it("should have a response with a 400 status code if the payload has a missing refresh token", async () => {
      const server = await createServer({
        logoutUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {},
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN
      );
    });

    it("should have a response with a 400 status code if the refresh token is not a string", async () => {
      const server = await createServer({
        logoutUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "DELETE",
        url: "/authentications",
        payload: {
          refreshToken: 123,
        },
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE
      );
    });
  });
});
