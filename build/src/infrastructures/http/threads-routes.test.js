"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentications_table_test_helper_1 = require("../../../tests/authentications-table-test-helper");
const threads_table_test_helper_1 = require("../../../tests/threads-table-test-helper");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const new_thread_error_1 = require("../../commons/constants/domains/threads/new-thread-error");
const thread_repository_error_1 = require("../../commons/constants/domains/threads/thread-repository-error");
const container_1 = require("../container");
const db_1 = require("../database/postgres/db");
const create_server_1 = require("./create-server");
describe("/threads endpoint", () => {
    const addUserUseCase = container_1.container.resolve("addUserUseCase");
    const loginUserUseCase = container_1.container.resolve("loginUserUseCase");
    const addThreadUseCase = container_1.container.resolve("addThreadUseCase");
    const addCommentUseCase = container_1.container.resolve("addCommentUseCase");
    const addReplyUseCase = container_1.container.resolve("addReplyUseCase");
    const getThreadDetailUseCase = container_1.container.resolve("getThreadDetailUseCase");
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
    });
    describe("when POST /threads", () => {
        it("should have a response with a 201 status code and persist the thread", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
            });
            const addUserPayload = {
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            const addUserResponse = await server.inject({
                method: "POST",
                url: "/users",
                payload: addUserPayload,
            });
            const addUserResponsePayloadJson = JSON.parse(addUserResponse.payload);
            const { addedUser } = addUserResponsePayloadJson.data;
            const loginUserResponse = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: addUserPayload.username,
                    password: addUserPayload.password,
                },
            });
            const loginUserResponsePayloadJson = JSON.parse(loginUserResponse.payload);
            const addThreadPayload = {
                title: "this is a title",
                body: "this is a body",
            };
            const addThreadResponse = await server.inject({
                method: "POST",
                url: "/threads",
                headers: {
                    authorization: `Bearer ${loginUserResponsePayloadJson.data.accessToken}`,
                },
                payload: addThreadPayload,
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            const { addedThread } = addThreadResponsePayloadJson.data;
            expect(addThreadResponse.statusCode).toEqual(201);
            expect(addThreadResponsePayloadJson.status).toEqual("success");
            expect(typeof addedThread.id).toEqual("string");
            expect(addedThread.title).toEqual(addThreadPayload.title);
            expect(addedThread.owner).toEqual(addedUser.id);
        });
        it("should have a response with a 400 status code if the payload has a missing property", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
            });
            const addUserPayload = {
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
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
            const addThreadResponse = await server.inject({
                method: "POST",
                url: "/threads",
                payload: {
                    title: "this is a title",
                },
                headers: {
                    authorization: `Bearer ${loginUserResponsePayloadJson.data.accessToken}`,
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            expect(addThreadResponse.statusCode).toEqual(400);
            expect(addThreadResponsePayloadJson.status).toEqual("fail");
            expect(addThreadResponsePayloadJson.message).toEqual(new_thread_error_1.NEW_THREAD_ERROR_MESSAGE.MISSING_PROPERTY);
        });
        it("should have a response with a 400 status code if the payload has an invalid data type", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
            });
            const addUserPayload = {
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
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
            const addThreadResponse = await server.inject({
                method: "POST",
                url: "/threads",
                payload: "123",
                headers: {
                    authorization: `Bearer ${loginUserResponsePayloadJson.data.accessToken}`,
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            expect(addThreadResponse.statusCode).toEqual(400);
            expect(addThreadResponsePayloadJson.status).toEqual("fail");
            expect(addThreadResponsePayloadJson.message).toEqual(new_thread_error_1.NEW_THREAD_ERROR_MESSAGE.INVALID_DATA_TYPE);
        });
        it("should have a response with a 401 status code if the authorization header is missing", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
            });
            await server.inject({
                method: "POST",
                url: "/users",
                payload: {
                    username: "bono",
                    password: "bono123",
                    fullname: "bono bono",
                },
            });
            const addThreadResponse = await server.inject({
                method: "POST",
                url: "/threads",
                payload: {
                    title: "this is a title",
                    body: "this is a body",
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            expect(addThreadResponse.statusCode).toEqual(401);
            expect(addThreadResponsePayloadJson.message).toEqual("Missing authentication");
        });
    });
    describe("when GET /threads", () => {
        it("should have a response with a 200 status code and return thread detail", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                addCommentUseCase,
                addReplyUseCase,
                getThreadDetailUseCase,
            });
            const addUserPayload = {
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
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
            const { accessToken } = loginUserResponsePayloadJson.data;
            const addThreadResponse = await server.inject({
                method: "POST",
                url: "/threads",
                payload: {
                    title: "this is a title",
                    body: "this is a body",
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            const { addedThread } = addThreadResponsePayloadJson.data;
            const addCommentResponse = await server.inject({
                method: "POST",
                url: `/threads/${addedThread.id}/comments`,
                payload: {
                    content: "this is a comment",
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const addCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            const { addedComment } = addCommentResponsePayloadJson.data;
            await server.inject({
                method: "POST",
                url: `/threads/${addedThread.id}/comments/${addedComment.id}/replies`,
                payload: {
                    content: "this is a reply",
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const getThreadDetailResponse = await server.inject({
                method: "GET",
                url: `/threads/${addedThread.id}`,
            });
            const getThreadDetailResponsePayloadJson = JSON.parse(getThreadDetailResponse.payload);
            const { thread } = getThreadDetailResponsePayloadJson.data;
            expect(getThreadDetailResponse.statusCode).toEqual(200);
            expect(getThreadDetailResponsePayloadJson.status).toEqual("success");
            expect(thread).toBeDefined();
        });
        it("should have a response with a 404 status code if the thread is not found", async () => {
            const server = await (0, create_server_1.createServer)({
                getThreadDetailUseCase,
            });
            const getThreadDetailResponse = await server.inject({
                method: "GET",
                url: `/threads/thread-123`,
            });
            const getThreadDetailResponsePayloadJson = JSON.parse(getThreadDetailResponse.payload);
            expect(getThreadDetailResponse.statusCode).toEqual(404);
            expect(getThreadDetailResponsePayloadJson.status).toEqual("fail");
            expect(getThreadDetailResponsePayloadJson.message).toEqual(thread_repository_error_1.THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND);
        });
    });
});
