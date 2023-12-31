import { AuthenticationsTableTestHelper } from "../../../tests/authentications-table-test-helper";
import { CommentsTableTestHelper } from "../../../tests/comments-table-test-helper";
import { ThreadsTableTestHelper } from "../../../tests/threads-table-test-helper";
import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { COMMENT_REPOSITORY_ERROR_MESSAGE } from "../../commons/constants/domains/comments/comment-repository-error";
import { NEW_REPLY_ERROR_MESSAGE } from "../../commons/constants/domains/replies/new-reply-error";
import { REPLY_REPOSITORY_ERROR_MESSAGE } from "../../commons/constants/domains/replies/reply-repository-error";
import { THREAD_REPOSITORY_ERROR_MESSAGE } from "../../commons/constants/domains/threads/thread-repository-error";
import { container } from "../container";
import { db } from "../database/postgres/db";
import { createServer, CreateServerDependencies } from "./create-server";

describe("/replies endpoint", () => {
  const addUserUseCase = container.resolve("addUserUseCase");

  const loginUserUseCase = container.resolve("loginUserUseCase");

  const addThreadUseCase = container.resolve("addThreadUseCase");

  const addCommentUseCase = container.resolve("addCommentUseCase");

  const addReplyUseCase = container.resolve("addReplyUseCase");

  const softDeleteReplyUseCase = container.resolve("softDeleteReplyUseCase");

  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  });

  describe("when POST /replies", () => {
    it("should have a response with a 201 status code and persist the reply", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
        addCommentUseCase,
        addReplyUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const loginUserResponsePayloadJson = JSON.parse(
        loginUserResponse.payload
      );

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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

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

      const addCommentResponsePayloadJson = JSON.parse(
        addCommentResponse.payload
      );

      const { addedComment } = addCommentResponsePayloadJson.data;

      const addReplyPayload = {
        content: "this is a content",
      };

      const addReplyResponse = await server.inject({
        method: "POST",
        url: `/threads/${addedThread.id}/comments/${addedComment.id}/replies`,
        payload: addReplyPayload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const addReplyResponsePayloadJson = JSON.parse(addReplyResponse.payload);

      const { addedReply } = addReplyResponsePayloadJson.data;

      expect(addReplyResponse.statusCode).toEqual(201);
      expect(addCommentResponsePayloadJson.status).toEqual("success");
      expect(typeof addedReply.id).toEqual("string");
      expect(addedReply.content).toEqual(addReplyPayload.content);
      expect(addedReply.owner).toEqual(addedUser.id);
    });

    it("should have a response with a 400 status code if the payload has a missing property", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addReplyUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const loginUserResponsePayloadJson = JSON.parse(
        loginUserResponse.payload
      );

      const { accessToken } = loginUserResponsePayloadJson.data;

      const addReplyResponse = await server.inject({
        method: "POST",
        url: "/threads/thread-123/comments/comment-123/replies",
        payload: {},
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const addReplyResponsePayloadJson = JSON.parse(addReplyResponse.payload);

      expect(addReplyResponse.statusCode).toEqual(400);
      expect(addReplyResponsePayloadJson.status).toEqual("fail");
      expect(addReplyResponsePayloadJson.message).toEqual(
        NEW_REPLY_ERROR_MESSAGE.MISSING_PROPERTY
      );
    });

    it("should have a response with a 400 status code if the payload has an invalid data type", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addReplyUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const loginUserResponsePayloadJson = JSON.parse(
        loginUserResponse.payload
      );

      const { accessToken } = loginUserResponsePayloadJson.data;

      const addReplyResponse = await server.inject({
        method: "POST",
        url: "/threads/thread-123/comments/comment-123/replies",
        payload: "123",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const addReplyResponsePayloadJson = JSON.parse(addReplyResponse.payload);

      expect(addReplyResponse.statusCode).toEqual(400);
      expect(addReplyResponsePayloadJson.status).toEqual("fail");
      expect(addReplyResponsePayloadJson.message).toEqual(
        NEW_REPLY_ERROR_MESSAGE.INVALID_DATA_TYPE
      );
    });

    it("should have a response with a 401 status code if the authorization header is missing", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
        addCommentUseCase,
        addReplyUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const loginUserResponsePayloadJson = JSON.parse(
        loginUserResponse.payload
      );

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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

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

      const addCommentResponsePayloadJson = JSON.parse(
        addCommentResponse.payload
      );

      const { addedComment } = addCommentResponsePayloadJson.data;

      const addReplyResponse = await server.inject({
        method: "POST",
        url: `/threads/${addedThread.id}/comments/${addedComment.id}/replies`,
        payload: {
          content: "this is a content",
        },
      });

      const addReplyResponsePayloadJson = JSON.parse(addReplyResponse.payload);

      expect(addReplyResponse.statusCode).toEqual(401);
      expect(addReplyResponsePayloadJson.message).toEqual(
        "Missing authentication"
      );
    });

    it("should have a response with a 404 status code if the thread or comment is not found", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
        addReplyUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const loginUserResponsePayloadJson = JSON.parse(
        loginUserResponse.payload
      );

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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

      const { addedThread } = addThreadResponsePayloadJson.data;

      const addReplyPayload = {
        content: "this is a content",
      };

      const addReplyResponseA = await server.inject({
        method: "POST",
        url: `/threads/thread-123/comments/comment-123/replies`,
        payload: addReplyPayload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const addReplyResponsePayloadJsonA = JSON.parse(
        addReplyResponseA.payload
      );

      const addReplyResponseB = await server.inject({
        method: "POST",
        url: `/threads/${addedThread.id}/comments/comment-123/replies`,
        payload: addReplyPayload,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const addReplyResponsePayloadJsonB = JSON.parse(
        addReplyResponseB.payload
      );

      expect(addReplyResponseA.statusCode).toEqual(404);
      expect(addReplyResponseB.statusCode).toEqual(404);
      expect(addReplyResponsePayloadJsonA.status).toEqual("fail");
      expect(addReplyResponsePayloadJsonB.status).toEqual("fail");
      expect(addReplyResponsePayloadJsonA.message).toEqual(
        THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND
      );
      expect(addReplyResponsePayloadJsonB.message).toEqual(
        COMMENT_REPOSITORY_ERROR_MESSAGE.COMMENT_NOT_FOUND
      );
    });
  });

  describe("when DELETE /replies", () => {
    it("should have a response with a 200 status code and soft delete the reply", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
        addCommentUseCase,
        addReplyUseCase,
        softDeleteReplyUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const loginUserResponsePayloadJson = JSON.parse(
        loginUserResponse.payload
      );

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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

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

      const addedCommentResponsePayloadJson = JSON.parse(
        addCommentResponse.payload
      );

      const { addedComment } = addedCommentResponsePayloadJson.data;

      const addReplyResponse = await server.inject({
        method: "POST",
        url: `/threads/${addedThread.id}/comments/${addedComment.id}/replies`,
        payload: {
          content: "this is a content",
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const addReplyResponsePayloadJson = JSON.parse(addReplyResponse.payload);

      const { addedReply } = addReplyResponsePayloadJson.data;

      const softDeleteReplyResponse = await server.inject({
        method: "DELETE",
        url: `/threads/${addedThread.id}/comments/${addedComment.id}/replies/${addedReply.id}`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const softDeleteReplyResponsePayloadJson = JSON.parse(
        softDeleteReplyResponse.payload
      );

      expect(softDeleteReplyResponse.statusCode).toEqual(200);
      expect(softDeleteReplyResponsePayloadJson.status).toEqual("success");
    });

    it("should have a response with a 401 status code if the authorization header is missing", async () => {
      const server = await createServer(
        {} satisfies Partial<CreateServerDependencies> as CreateServerDependencies
      );

      const softDeleteReplyResponse = await server.inject({
        method: "DELETE",
        url: "/threads/thread-123/comments/comment-123/replies/reply-123",
      });

      const softDeleteReplyResponsePayloadJson = JSON.parse(
        softDeleteReplyResponse.payload
      );

      expect(softDeleteReplyResponse.statusCode).toEqual(401);
      expect(softDeleteReplyResponsePayloadJson.message).toEqual(
        "Missing authentication"
      );
    });

    it("should have a response with a 403 status code if the user is not the reply owner", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
        addCommentUseCase,
        addReplyUseCase,
        softDeleteReplyUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const loginUserResponsePayloadJsonA = JSON.parse(
        loginUserResponseA.payload
      );

      const { accessToken: accessTokenA } = loginUserResponsePayloadJsonA.data;

      const loginUserResponseB = await server.inject({
        method: "POST",
        url: "/authentications",
        payload: {
          username: addUserPayloadB.username,
          password: addUserPayloadB.password,
        },
      });

      const loginUserResponsePayloadJsonB = JSON.parse(
        loginUserResponseB.payload
      );

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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

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

      const addCommentResponsePayloadJson = JSON.parse(
        addCommentResponse.payload
      );

      const { addedComment } = addCommentResponsePayloadJson.data;

      const addReplyResponse = await server.inject({
        method: "POST",
        url: `/threads/${addedThread.id}/comments/${addedComment.id}/replies`,
        payload: {
          content: "this is a content",
        },
        headers: {
          authorization: `Bearer ${accessTokenA}`,
        },
      });

      const addReplyResponsePayloadJson = JSON.parse(addReplyResponse.payload);

      const { addedReply } = addReplyResponsePayloadJson.data;

      const softDeleteCommentResponse = await server.inject({
        method: "DELETE",
        url: `/threads/${addedThread.id}/comments/${addedComment.id}/replies/${addedReply.id}`,
        headers: {
          authorization: `Bearer ${accessTokenB}`,
        },
      });

      const softDeleteReplyResponsePayloadJson = JSON.parse(
        softDeleteCommentResponse.payload
      );

      expect(softDeleteCommentResponse.statusCode).toEqual(403);
      expect(softDeleteReplyResponsePayloadJson.status).toEqual("fail");
      expect(softDeleteReplyResponsePayloadJson.message).toEqual(
        REPLY_REPOSITORY_ERROR_MESSAGE.UNAUTHORIZED_REPLY_DELETION
      );
    });

    it("should have a response with a 404 status code if the thread, comment or reply is not found", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
        addCommentUseCase,
        addReplyUseCase,
        softDeleteReplyUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const loginUserResponsePayloadJson = JSON.parse(
        loginUserResponse.payload
      );

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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

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

      const addedCommentResponsePayloadJson = JSON.parse(
        addCommentResponse.payload
      );

      const { addedComment } = addedCommentResponsePayloadJson.data;

      const softDeleteReplyResponseA = await server.inject({
        method: "DELETE",
        url: `/threads/thread-123/comments/comment-123/replies/reply-123`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const softDeleteReplyResponsePayloadJsonA = JSON.parse(
        softDeleteReplyResponseA.payload
      );

      const softDeleteReplyResponseB = await server.inject({
        method: "DELETE",
        url: `/threads/${addedThread.id}/comments/comment-123/replies/reply-123`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const softDeleteReplyResponsePayloadJsonB = JSON.parse(
        softDeleteReplyResponseB.payload
      );

      const softDeleteReplyResponseC = await server.inject({
        method: "DELETE",
        url: `/threads/${addedThread.id}/comments/${addedComment.id}/replies/reply-123`,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const softDeleteReplyResponsePayloadJsonC = JSON.parse(
        softDeleteReplyResponseC.payload
      );

      expect(softDeleteReplyResponseA.statusCode).toEqual(404);
      expect(softDeleteReplyResponseB.statusCode).toEqual(404);
      expect(softDeleteReplyResponseC.statusCode).toEqual(404);
      expect(softDeleteReplyResponsePayloadJsonA.status).toEqual("fail");
      expect(softDeleteReplyResponsePayloadJsonB.status).toEqual("fail");
      expect(softDeleteReplyResponsePayloadJsonC.status).toEqual("fail");
      expect(softDeleteReplyResponsePayloadJsonA.message).toEqual(
        THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND
      );
      expect(softDeleteReplyResponsePayloadJsonB.message).toEqual(
        COMMENT_REPOSITORY_ERROR_MESSAGE.COMMENT_NOT_FOUND
      );
      expect(softDeleteReplyResponsePayloadJsonC.message).toEqual(
        REPLY_REPOSITORY_ERROR_MESSAGE.REPLY_NOT_FOUND
      );
    });
  });
});
