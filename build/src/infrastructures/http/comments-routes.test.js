"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentications_table_test_helper_1 = require("../../../tests/authentications-table-test-helper");
const comment_likes_table_test_helper_1 = require("../../../tests/comment-likes-table-test-helper");
const comments_table_test_helper_1 = require("../../../tests/comments-table-test-helper");
const threads_table_test_helper_1 = require("../../../tests/threads-table-test-helper");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const comment_repository_error_1 = require("../../commons/constants/domains/comments/comment-repository-error");
const new_comment_error_1 = require("../../commons/constants/domains/comments/new-comment-error");
const thread_repository_error_1 = require("../../commons/constants/domains/threads/thread-repository-error");
const container_1 = require("../container");
const db_1 = require("../database/postgres/db");
const create_server_1 = require("./create-server");
describe("/comments endpoint", () => {
    const addUserUseCase = container_1.container.resolve("addUserUseCase");
    const loginUserUseCase = container_1.container.resolve("loginUserUseCase");
    const addThreadUseCase = container_1.container.resolve("addThreadUseCase");
    const addCommentUseCase = container_1.container.resolve("addCommentUseCase");
    const softDeleteCommentUseCase = container_1.container.resolve("softDeleteCommentUseCase");
    const toggleCommentLikeUseCase = container_1.container.resolve("toggleCommentLikeUseCase");
    const getThreadDetailUseCase = container_1.container.resolve("getThreadDetailUseCase");
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
        await comments_table_test_helper_1.CommentsTableTestHelper.cleanTable();
        await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
        await comments_table_test_helper_1.CommentsTableTestHelper.cleanTable();
        await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.cleanTable();
    });
    describe("when POST /comments", () => {
        it("should have a response with a 201 status code and persist the comment", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                addCommentUseCase,
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
            const addCommentPayload = {
                content: "this is a content",
            };
            const addCommentResponse = await server.inject({
                method: "POST",
                url: `/threads/${addedThread.id}/comments`,
                payload: addCommentPayload,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const addCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            const { addedComment } = addCommentResponsePayloadJson.data;
            expect(addCommentResponse.statusCode).toEqual(201);
            expect(addCommentResponsePayloadJson.status).toEqual("success");
            expect(typeof addedComment.id).toEqual("string");
            expect(addedComment.content).toEqual(addCommentPayload.content);
            expect(addedComment.owner).toEqual(addedUser.id);
        });
        it("should have a response with a 400 status code if the payload has missing property", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                addCommentUseCase,
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
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const addCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            expect(addCommentResponse.statusCode).toEqual(400);
            expect(addCommentResponsePayloadJson.status).toEqual("fail");
            expect(addCommentResponsePayloadJson.message).toEqual(new_comment_error_1.NEW_COMMENT_ERROR_MESSAGE.MISSING_PROPERTY);
        });
        it("should have a response with a 400 status code if the payload has an invalid data type", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                addCommentUseCase,
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
                payload: "123",
                headers: {
                    authorization: `Bearer ${loginUserResponsePayloadJson.data.accessToken}`,
                },
            });
            const addCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            expect(addCommentResponse.statusCode).toEqual(400);
            expect(addCommentResponsePayloadJson.status).toEqual("fail");
            expect(addCommentResponsePayloadJson.message).toEqual(new_comment_error_1.NEW_COMMENT_ERROR_MESSAGE.INVALID_DATA_TYPE);
        });
        it("should have a response with a 401 status code if the authorization header is missing", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                addCommentUseCase,
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
                    content: "this is a content",
                },
            });
            const addCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            expect(addCommentResponse.statusCode).toEqual(401);
            expect(addCommentResponsePayloadJson.message).toEqual("Missing authentication");
        });
        it("should have a response with a 404 status code if the thread is not found", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addCommentUseCase,
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
            const addCommentResponse = await server.inject({
                method: "POST",
                url: `/threads/thread-123/comments`,
                payload: {
                    content: "this is a content",
                },
                headers: {
                    authorization: `Bearer ${loginUserResponsePayloadJson.data.accessToken}`,
                },
            });
            const addCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            expect(addCommentResponse.statusCode).toEqual(404);
            expect(addCommentResponsePayloadJson.status).toEqual("fail");
            expect(addCommentResponsePayloadJson.message).toEqual(thread_repository_error_1.THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND);
        });
    });
    describe("when DELETE /comments", () => {
        it("should have a response with a 200 statusCode and soft delete the comment", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                addCommentUseCase,
                softDeleteCommentUseCase,
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
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
                payload: {
                    title: "this is a title",
                    body: "this is a title",
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            const { addedThread } = addThreadResponsePayloadJson.data;
            const addCommentResponse = await server.inject({
                method: "POST",
                url: `/threads/${addedThread.id}/comments`,
                payload: {
                    content: "this is a content",
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const addedCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            const { addedComment } = addedCommentResponsePayloadJson.data;
            const softDeleteCommentResponse = await server.inject({
                method: "DELETE",
                url: `/threads/${addedThread.id}/comments/${addedComment.id}`,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const softDeleteCommentResponsePayloadJson = JSON.parse(softDeleteCommentResponse.payload);
            expect(softDeleteCommentResponse.statusCode).toEqual(200);
            expect(softDeleteCommentResponsePayloadJson.status).toEqual("success");
        });
        it("should have a response with a 401 statusCode if the authorization header is missing", async () => {
            const server = await (0, create_server_1.createServer)({});
            const softDeleteResponse = await server.inject({
                method: "DELETE",
                url: "/threads/thread-123/comments/comment-123",
            });
            const softDeleteCommentResponsePayloadJson = JSON.parse(softDeleteResponse.payload);
            expect(softDeleteResponse.statusCode).toEqual(401);
            expect(softDeleteCommentResponsePayloadJson.message).toEqual("Missing authentication");
        });
        it("should have a response with a 403 statusCode if the user is not the comment owner", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                addCommentUseCase,
                softDeleteCommentUseCase,
            });
            const addUserPayloadA = {
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            await server.inject({
                method: "POST",
                url: "/users",
                payload: addUserPayloadA,
            });
            const addUserPayloadB = {
                username: "mika",
                password: "mika123",
                fullname: "mika mika",
            };
            await server.inject({
                method: "POST",
                url: "/users",
                payload: addUserPayloadB,
            });
            const loginUserResponseA = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: addUserPayloadA.username,
                    password: addUserPayloadA.password,
                },
            });
            const loginUserResponsePayloadJsonA = JSON.parse(loginUserResponseA.payload);
            const { accessToken: accessTokenA } = loginUserResponsePayloadJsonA.data;
            const loginUserResponseB = await server.inject({
                method: "POST",
                url: "/authentications",
                payload: {
                    username: addUserPayloadB.username,
                    password: addUserPayloadB.password,
                },
            });
            const loginUserResponsePayloadJsonB = JSON.parse(loginUserResponseB.payload);
            const { accessToken: accessTokenB } = loginUserResponsePayloadJsonB.data;
            const addThreadResponse = await server.inject({
                method: "POST",
                url: "/threads",
                payload: {
                    title: "this is a title",
                    body: "this is a body",
                },
                headers: {
                    authorization: `Bearer ${accessTokenA}`,
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            const { addedThread } = addThreadResponsePayloadJson.data;
            const addCommentResponse = await server.inject({
                method: "POST",
                url: `/threads/${addedThread.id}/comments`,
                payload: {
                    content: "this is a content",
                },
                headers: {
                    authorization: `Bearer ${accessTokenA}`,
                },
            });
            const addCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            const { addedComment } = addCommentResponsePayloadJson.data;
            const softDeleteCommentResponse = await server.inject({
                method: "DELETE",
                url: `/threads/${addedThread.id}/comments/${addedComment.id}`,
                headers: {
                    authorization: `Bearer ${accessTokenB}`,
                },
            });
            const softDeleteCommentResponsePayloadJson = JSON.parse(softDeleteCommentResponse.payload);
            expect(softDeleteCommentResponse.statusCode).toEqual(403);
            expect(softDeleteCommentResponsePayloadJson.status).toEqual("fail");
            expect(softDeleteCommentResponsePayloadJson.message).toEqual(comment_repository_error_1.COMMENT_REPOSITORY_ERROR_MESSAGE.UNAUTHORIZED_COMMENT_DELETION);
        });
        it("should have a response with a 404 statusCode if the thread or comment is not found", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                softDeleteCommentUseCase,
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
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
                payload: {
                    title: "this is a title",
                    body: "this is a body",
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            const { addedThread } = addThreadResponsePayloadJson.data;
            const softDeleteCommentResponseA = await server.inject({
                method: "DELETE",
                url: `/threads/thread-123/comments/comment-123`,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const softDeleteCommentResponsePayloadJsonA = JSON.parse(softDeleteCommentResponseA.payload);
            const softDeleteCommentResponseB = await server.inject({
                method: "DELETE",
                url: `/threads/${addedThread.id}/comments/comment-123`,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const softDeleteCommentResponsePayloadJsonB = JSON.parse(softDeleteCommentResponseB.payload);
            expect(softDeleteCommentResponseA.statusCode).toEqual(404);
            expect(softDeleteCommentResponseB.statusCode).toEqual(404);
            expect(softDeleteCommentResponsePayloadJsonA.status).toEqual("fail");
            expect(softDeleteCommentResponsePayloadJsonB.status).toEqual("fail");
            expect(softDeleteCommentResponsePayloadJsonA.message).toEqual(thread_repository_error_1.THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND);
            expect(softDeleteCommentResponsePayloadJsonB.message).toEqual(comment_repository_error_1.COMMENT_REPOSITORY_ERROR_MESSAGE.COMMENT_NOT_FOUND);
        });
    });
    describe("when PUT /likes", () => {
        it("should have a response with a 200 statusCode and toggle comment like", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                addCommentUseCase,
                toggleCommentLikeUseCase,
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
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
                payload: {
                    title: "this is a title",
                    body: "this is a title",
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            const { addedThread } = addThreadResponsePayloadJson.data;
            const addCommentResponse = await server.inject({
                method: "POST",
                url: `/threads/${addedThread.id}/comments`,
                payload: {
                    content: "this is a content",
                },
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const addedCommentResponsePayloadJson = JSON.parse(addCommentResponse.payload);
            const { addedComment } = addedCommentResponsePayloadJson.data;
            await server.inject({
                method: "PUT",
                url: `/threads/${addedThread.id}/comments/${addedComment.id}/likes`,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const getThreadDetailResponseA = await server.inject({
                method: "GET",
                url: `/threads/${addedThread.id}`,
            });
            const getThreadDetailResponsePayloadJsonA = JSON.parse(getThreadDetailResponseA.payload);
            const { thread: threadDetailA } = getThreadDetailResponsePayloadJsonA.data;
            expect(threadDetailA.comments[0].likeCount).toEqual(1);
            await server.inject({
                method: "PUT",
                url: `/threads/${addedThread.id}/comments/${addedComment.id}/likes`,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const getThreadDetailResponseB = await server.inject({
                method: "GET",
                url: `/threads/${addedThread.id}`,
            });
            const getThreadDetailResponsePayloadJsonB = JSON.parse(getThreadDetailResponseB.payload);
            const { thread: threadDetailB } = getThreadDetailResponsePayloadJsonB.data;
            expect(threadDetailB.comments[0].likeCount).toEqual(0);
        });
        it("should have a response with a 404 statusCode if the thread or comment is not found", async () => {
            const server = await (0, create_server_1.createServer)({
                addUserUseCase,
                loginUserUseCase,
                addThreadUseCase,
                toggleCommentLikeUseCase,
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
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
                payload: {
                    title: "this is a title",
                    body: "this is a content",
                },
            });
            const addThreadResponsePayloadJson = JSON.parse(addThreadResponse.payload);
            const { addedThread } = addThreadResponsePayloadJson.data;
            const toggleCommentLikeResponseA = await server.inject({
                method: "PUT",
                url: "/threads/thread-123/comments/comment-123/likes",
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const toggleCommentLikeResponsePayloadJsonA = JSON.parse(toggleCommentLikeResponseA.payload);
            const toggleCommentLikeResponseB = await server.inject({
                method: "PUT",
                url: `/threads/${addedThread.id}/comments/comment-123/likes`,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            });
            const toggleCommentLikeResponsePayloadJsonB = JSON.parse(toggleCommentLikeResponseB.payload);
            expect(toggleCommentLikeResponseA.statusCode).toEqual(404);
            expect(toggleCommentLikeResponseB.statusCode).toEqual(404);
            expect(toggleCommentLikeResponsePayloadJsonA.status).toEqual("fail");
            expect(toggleCommentLikeResponsePayloadJsonB.status).toEqual("fail");
            expect(toggleCommentLikeResponsePayloadJsonA.message).toEqual(thread_repository_error_1.THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND);
            expect(toggleCommentLikeResponsePayloadJsonB.message).toEqual(comment_repository_error_1.COMMENT_REPOSITORY_ERROR_MESSAGE.COMMENT_NOT_FOUND);
        });
    });
});
