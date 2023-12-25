"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const register_user_error_1 = require("../../commons/constants/domains/users/register-user-error");
const user_repository_error_1 = require("../../commons/constants/domains/users/user-repository-error");
const container_1 = require("../container");
const db_1 = require("../database/postgres/db");
const create_server_1 = require("./create-server");
describe("/users endpoint", () => {
    const addUserUseCase = container_1.container.resolve("addUserUseCase");
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
    });
    describe("when POST /users", () => {
        it("should have a response with a 201 status code and return the persisted user", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
            });
            const addUserPayload = {
                username: "dicoding",
                password: "secret",
                fullname: "Dicoding Indonesia",
            };
            const addUserResponse = await server.inject({
                method: "POST",
                url: "/users",
                payload: addUserPayload,
            });
            const addUserResponsePayloadJson = JSON.parse(addUserResponse.payload);
            const { addedUser } = addUserResponsePayloadJson.data;
            expect(addUserResponse.statusCode).toEqual(201);
            expect(addUserResponsePayloadJson.status).toEqual("success");
            expect(typeof addedUser.id).toEqual("string");
            expect(addedUser.username).toEqual(addUserPayload.username);
            expect(addedUser.fullname).toEqual(addUserPayload.fullname);
        });
        it("should have a response with a 400 status code if the payload has a missing property", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
            });
            const addUserResponse = await server.inject({
                method: "POST",
                url: "/users",
                payload: {},
            });
            const addUserResponsePayloadJson = JSON.parse(addUserResponse.payload);
            expect(addUserResponse.statusCode).toEqual(400);
            expect(addUserResponsePayloadJson.status).toEqual("fail");
            expect(addUserResponsePayloadJson.message).toEqual(register_user_error_1.REGISTER_USER_ERROR_MESSAGE.MISSING_PROPERTY);
        });
        it("should have a response with a 400 status code if the payload has an invalid data type", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
            });
            const addUserResponse = await server.inject({
                method: "POST",
                url: "/users",
                payload: {
                    username: 123,
                },
            });
            const addUserResponsePayloadJson = JSON.parse(addUserResponse.payload);
            expect(addUserResponse.statusCode).toEqual(400);
            expect(addUserResponsePayloadJson.status).toEqual("fail");
            expect(addUserResponsePayloadJson.message).toEqual(register_user_error_1.REGISTER_USER_ERROR_MESSAGE.INVALID_DATA_TYPE);
        });
        it("should have a response with a 400 status code if the username contains more than 50 characters", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
            });
            const addUserResponse = await server.inject({
                method: "POST",
                url: "/users",
                payload: {
                    username: "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
                    password: "secret",
                    fullname: "Dicoding Indonesia",
                },
            });
            const addUserResponsePayloadJson = JSON.parse(addUserResponse.payload);
            expect(addUserResponse.statusCode).toEqual(400);
            expect(addUserResponsePayloadJson.status).toEqual("fail");
            expect(addUserResponsePayloadJson.message).toEqual(register_user_error_1.REGISTER_USER_ERROR_MESSAGE.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT);
        });
        it("should have a response with a 400 status code if the username contains a restricted character", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
            });
            const addUserResponse = await server.inject({
                method: "POST",
                url: "/users",
                payload: {
                    username: "dicoding indonesia",
                    password: "secret",
                    fullname: "Dicoding Indonesia",
                },
            });
            const addUserResponsePayloadJson = JSON.parse(addUserResponse.payload);
            expect(addUserResponse.statusCode).toEqual(400);
            expect(addUserResponsePayloadJson.status).toEqual("fail");
            expect(addUserResponsePayloadJson.message).toEqual(register_user_error_1.REGISTER_USER_ERROR_MESSAGE.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER);
        });
        it("should have a response with a 400 status code if the username is not available", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
            });
            const addUserPayload = {
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            await users_table_test_helper_1.UsersTableTestHelper.addUser(Object.assign({ id: "user-123" }, addUserPayload));
            const addUserResponse = await server.inject({
                method: "POST",
                url: "/users",
                payload: addUserPayload,
            });
            const addUserResponsePayloadJson = JSON.parse(addUserResponse.payload);
            expect(addUserResponse.statusCode).toEqual(400);
            expect(addUserResponsePayloadJson.status).toEqual("fail");
            expect(addUserResponsePayloadJson.message).toEqual(user_repository_error_1.USER_REPOSITORY_ERROR_MESSAGE.USERNAME_NOT_FOUND);
        });
    });
});
