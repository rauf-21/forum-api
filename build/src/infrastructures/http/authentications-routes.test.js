"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentications_table_test_helper_1 = require("../../../tests/authentications-table-test-helper");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const authentication_token_manager_error_1 = require("../../commons/constants/applications/security/authentication-token-manager-error");
const password_hash_error_1 = require("../../commons/constants/applications/security/password-hash-error");
const delete_authentication_use_case_error_1 = require("../../commons/constants/applications/use-case/delete-authentication-use-case-error");
const refresh_authentication_use_case_error_1 = require("../../commons/constants/applications/use-case/refresh-authentication-use-case-error");
const authentication_repository_error_1 = require("../../commons/constants/domains/authentications/authentication-repository-error");
const user_login_error_1 = require("../../commons/constants/domains/users/user-login-error");
const user_repository_error_1 = require("../../commons/constants/domains/users/user-repository-error");
const container_1 = require("../container");
const db_1 = require("../database/postgres/db");
const create_server_1 = require("./create-server");
describe("/authentications endpoint", () => {
    const addUserUseCase = container_1.container.resolve("addUserUseCase");
    const loginUserUseCase = container_1.container.resolve("loginUserUseCase");
    const logoutUserUseCase = container_1.container.resolve("logoutUserUseCase");
    const refreshAuthenticationUseCase = container_1.container.resolve("refreshAuthenticationUseCase");
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
    });
    describe("when POST /authentications", () => {
        it("should have a response with a 201 status code and return new authentication", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
            });
            const addUserPayload = {
                username: "dicoding",
                password: "secret",
                fullname: "Dicoding Indonesia",
            };
            await server.inject({
                method: "POST",
                url: "/users",
                payload: addUserPayload,
            });
            const loginUserResponse = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: addUserPayload.username,
                    password: addUserPayload.password,
                },
            });
            const loginUserResponsePayloadJson = JSON.parse(loginUserResponse.payload);
            expect(loginUserResponse.statusCode).toEqual(201);
            expect(loginUserResponsePayloadJson.status).toEqual("success");
            expect(typeof loginUserResponsePayloadJson.data.accessToken).toEqual("string");
            expect(typeof loginUserResponsePayloadJson.data.refreshToken).toEqual("string");
        });
        it("should have a response with a 400 status code if the payload has missing property", async () => {
            const server = await (0, create_server_1.createServer)({
                loginUserUseCase,
            });
            const loginUserResponse = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: "dicoding",
                },
            });
            const loginUserResponsePayloadJson = JSON.parse(loginUserResponse.payload);
            expect(loginUserResponse.statusCode).toEqual(400);
            expect(loginUserResponsePayloadJson.status).toEqual("fail");
            expect(loginUserResponsePayloadJson.message).toEqual(user_login_error_1.USER_LOGIN_ERROR_MESSAGE.MISSING_PROPERTY);
        });
        it("should have a response with a 400 status code if the payload has an invalid data type", async () => {
            const server = await (0, create_server_1.createServer)({
                loginUserUseCase,
            });
            const loginUserResponse = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: 123,
                },
            });
            const loginUserResponsePayloadJson = JSON.parse(loginUserResponse.payload);
            expect(loginUserResponse.statusCode).toEqual(400);
            expect(loginUserResponsePayloadJson.status).toEqual("fail");
            expect(loginUserResponsePayloadJson.message).toEqual(user_login_error_1.USER_LOGIN_ERROR_MESSAGE.INVALID_DATA_TYPE);
        });
        it("should have a response with a 400 status code if the username is not found", async () => {
            const server = await (0, create_server_1.createServer)({
                loginUserUseCase,
            });
            const loginUserResponse = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: "dicoding",
                    password: "secret",
                },
            });
            const loginUserResponsePayloadJson = JSON.parse(loginUserResponse.payload);
            expect(loginUserResponse.statusCode).toEqual(400);
            expect(loginUserResponsePayloadJson.status).toEqual("fail");
            expect(loginUserResponsePayloadJson.message).toEqual(user_repository_error_1.USER_REPOSITORY_ERROR_MESSAGE.USERNAME_NOT_FOUND);
        });
        it("should have a response with a 401 status code if the password is incorrect", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
            });
            const addUserPayload = {
                username: "dicoding",
                password: "secret",
                fullname: "Dicoding Indonesia",
            };
            await server.inject({
                method: "POST",
                url: "/users",
                payload: addUserPayload,
            });
            const loginUserResponse = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: addUserPayload.username,
                    password: "incorrect-password",
                },
            });
            const loginUserResponsePayloadJson = JSON.parse(loginUserResponse.payload);
            expect(loginUserResponse.statusCode).toEqual(401);
            expect(loginUserResponsePayloadJson.status).toEqual("fail");
            expect(loginUserResponsePayloadJson.message).toEqual(password_hash_error_1.PASSWORD_HASH_ERROR_MESSAGE.INCORRECT_CREDENTIALS);
        });
    });
    describe("when PUT /authentications", () => {
        it("should have a response with a 200 status code and return new access token", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                refreshAuthenticationUseCase,
            });
            const addUserPayload = {
                username: "dicoding",
                password: "secret",
                fullname: "Dicoding Indonesia",
            };
            await server.inject({
                method: "POST",
                url: "/users",
                payload: addUserPayload,
            });
            const loginUserResponse = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: addUserPayload.username,
                    password: addUserPayload.password,
                },
            });
            const loginUserResponsePayloadJson = JSON.parse(loginUserResponse.payload);
            const refreshAuthenticationResponse = await server.inject({
                method: "PUT",
                url: "/authentications",
                payload: {
                    refreshToken: loginUserResponsePayloadJson.data.refreshToken,
                },
            });
            const refreshAuthenticationResponsePayloadJson = JSON.parse(refreshAuthenticationResponse.payload);
            expect(refreshAuthenticationResponse.statusCode).toEqual(200);
            expect(refreshAuthenticationResponsePayloadJson.status).toEqual("success");
            expect(typeof refreshAuthenticationResponsePayloadJson.data.accessToken).toEqual("string");
        });
        it("should have a response with a 400 status code if the payload has a missing refresh token", async () => {
            const server = await (0, create_server_1.createServer)({
                refreshAuthenticationUseCase,
            });
            const refreshAuthenticationResponse = await server.inject({
                method: "PUT",
                url: "/authentications",
                payload: {},
            });
            const refreshAuthenticationResponsePayloadJson = JSON.parse(refreshAuthenticationResponse.payload);
            expect(refreshAuthenticationResponse.statusCode).toEqual(400);
            expect(refreshAuthenticationResponsePayloadJson.status).toEqual("fail");
            expect(refreshAuthenticationResponsePayloadJson.message).toEqual(refresh_authentication_use_case_error_1.REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN);
        });
        it("should have a response with a 400 status code if the refresh token is not a string", async () => {
            const server = await (0, create_server_1.createServer)({
                refreshAuthenticationUseCase,
            });
            const refreshAuthenticationResponse = await server.inject({
                method: "PUT",
                url: "/authentications",
                payload: {
                    refreshToken: 123,
                },
            });
            const refreshAuthenticationResponsePayloadJson = JSON.parse(refreshAuthenticationResponse.payload);
            expect(refreshAuthenticationResponse.statusCode).toEqual(400);
            expect(refreshAuthenticationResponsePayloadJson.status).toEqual("fail");
            expect(refreshAuthenticationResponsePayloadJson.message).toEqual(refresh_authentication_use_case_error_1.REFRESH_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE);
        });
        it("should have a response with a 400 status code if the refresh token is not valid", async () => {
            const server = await (0, create_server_1.createServer)({
                refreshAuthenticationUseCase,
            });
            const refreshAuthenticationResponse = await server.inject({
                method: "PUT",
                url: "/authentications",
                payload: {
                    refreshToken: "invalid_refresh_token",
                },
            });
            const refreshAuthenticationResponsePayloadJson = JSON.parse(refreshAuthenticationResponse.payload);
            expect(refreshAuthenticationResponse.statusCode).toEqual(400);
            expect(refreshAuthenticationResponsePayloadJson.status).toEqual("fail");
            expect(refreshAuthenticationResponsePayloadJson.message).toEqual(authentication_token_manager_error_1.AUTHENTICATION_TOKEN_MANAGER_ERROR_MESSAGE.INVALID_REFRESH_TOKEN);
        });
        it("should have a response with a 400 status code if the refresh token is not registered in the database", async () => {
            const server = await (0, create_server_1.createServer)({
                refreshAuthenticationUseCase,
            });
            const refreshToken = await container_1.container
                .resolve("authenticationTokenManager")
                .createRefreshToken({
                id: "user-123",
                username: "dicoding",
            });
            const refreshAuthenticationResponse = await server.inject({
                method: "PUT",
                url: "/authentications",
                payload: {
                    refreshToken,
                },
            });
            const refreshAuthenticationResponsePayloadJson = JSON.parse(refreshAuthenticationResponse.payload);
            expect(refreshAuthenticationResponse.statusCode).toEqual(400);
            expect(refreshAuthenticationResponsePayloadJson.status).toEqual("fail");
            expect(refreshAuthenticationResponsePayloadJson.message).toEqual(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR_MESSAGE.REFRESH_TOKEN_NOT_FOUND);
        });
    });
    describe("when DELETE /authentications", () => {
        it("should have a response with a 200 status code if the refresh token is valid", async () => {
            const server = await (0, create_server_1.createServer)({
                logoutUserUseCase,
            });
            const refreshToken = "refresh_token";
            await authentications_table_test_helper_1.AuthenticationsTableTestHelper.addToken(refreshToken);
            const logoutUserResponse = await server.inject({
                method: "DELETE",
                url: "/authentications",
                payload: {
                    refreshToken,
                },
            });
            const logoutUserResponsePayloadJson = JSON.parse(logoutUserResponse.payload);
            expect(logoutUserResponse.statusCode).toEqual(200);
            expect(logoutUserResponsePayloadJson.status).toEqual("success");
        });
        it("should have a response with a 400 status code if the refresh token is not registered in the database", async () => {
            const server = await (0, create_server_1.createServer)({
                logoutUserUseCase,
            });
            const logoutUserResponse = await server.inject({
                method: "DELETE",
                url: "/authentications",
                payload: {
                    refreshToken: "refresh-token",
                },
            });
            const logoutUserResponsePayloadJson = JSON.parse(logoutUserResponse.payload);
            expect(logoutUserResponse.statusCode).toEqual(400);
            expect(logoutUserResponsePayloadJson.status).toEqual("fail");
            expect(logoutUserResponsePayloadJson.message).toEqual(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR_MESSAGE.REFRESH_TOKEN_NOT_FOUND);
        });
        it("should have a response with a 400 status code if the payload has a missing refresh token", async () => {
            const server = await (0, create_server_1.createServer)({
                logoutUserUseCase,
            });
            const logoutUserResponse = await server.inject({
                method: "DELETE",
                url: "/authentications",
                payload: {},
            });
            const logoutUserResponsePayloadJson = JSON.parse(logoutUserResponse.payload);
            expect(logoutUserResponse.statusCode).toEqual(400);
            expect(logoutUserResponsePayloadJson.status).toEqual("fail");
            expect(logoutUserResponsePayloadJson.message).toEqual(delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.MISSING_REFRESH_TOKEN);
        });
        it("should have a response with a 400 status code if the refresh token is not a string", async () => {
            const server = await (0, create_server_1.createServer)({
                logoutUserUseCase,
            });
            const logoutUserResponse = await server.inject({
                method: "DELETE",
                url: "/authentications",
                payload: {
                    refreshToken: 123,
                },
            });
            const logoutUserResponsePayloadJson = JSON.parse(logoutUserResponse.payload);
            expect(logoutUserResponse.statusCode).toEqual(400);
            expect(logoutUserResponsePayloadJson.status).toEqual("fail");
            expect(logoutUserResponsePayloadJson.message).toEqual(delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN_DATA_TYPE);
        });
    });
});
