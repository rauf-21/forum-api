import { AuthenticationsTableTestHelper } from "../../../tests/authentications-table-test-helper";
import { ThreadsTableTestHelper } from "../../../tests/threads-table-test-helper";
import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { NEW_THREAD_ERROR_MESSAGE } from "../../commons/constants/domains/threads/new-thread-error";
import { THREAD_REPOSITORY_ERROR_MESSAGE } from "../../commons/constants/domains/threads/thread-repository-error";
import { container } from "../container";
import { db } from "../database/postgres/db";
import { createServer, CreateServerDependencies } from "./create-server";

describe("/threads endpoint", () => {
  const addUserUseCase = container.resolve("addUserUseCase");

  const loginUserUseCase = container.resolve("loginUserUseCase");

  const addThreadUseCase = container.resolve("addThreadUseCase");

  const addCommentUseCase = container.resolve("addCommentUseCase");

  const addReplyUseCase = container.resolve("addReplyUseCase");

  const getThreadDetailUseCase = container.resolve("getThreadDetailUseCase");

  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe("when POST /threads", () => {
    it("should have a response with a 201 status code and persist the thread", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

      const { addedThread } = addThreadResponsePayloadJson.data;

      expect(addThreadResponse.statusCode).toEqual(201);
      expect(addThreadResponsePayloadJson.status).toEqual("success");
      expect(typeof addedThread.id).toEqual("string");
      expect(addedThread.title).toEqual(addThreadPayload.title);
      expect(addedThread.owner).toEqual(addedUser.id);
    });

    it("should have a response with a 400 status code if the payload has a missing property", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

      expect(addThreadResponse.statusCode).toEqual(400);
      expect(addThreadResponsePayloadJson.status).toEqual("fail");
      expect(addThreadResponsePayloadJson.message).toEqual(
        NEW_THREAD_ERROR_MESSAGE.MISSING_PROPERTY
      );
    });

    it("should have a response with a 400 status code if the payload has an invalid data type", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
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

      const addThreadResponse = await server.inject({
        method: "POST",
        url: "/threads",
        payload: "123",
        headers: {
          authorization: `Bearer ${loginUserResponsePayloadJson.data.accessToken}`,
        },
      });

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

      expect(addThreadResponse.statusCode).toEqual(400);
      expect(addThreadResponsePayloadJson.status).toEqual("fail");
      expect(addThreadResponsePayloadJson.message).toEqual(
        NEW_THREAD_ERROR_MESSAGE.INVALID_DATA_TYPE
      );
    });

    it("should have a response with a 401 status code if the authorization header is missing", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

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

      const addThreadResponsePayloadJson = JSON.parse(
        addThreadResponse.payload
      );

      expect(addThreadResponse.statusCode).toEqual(401);
      expect(addThreadResponsePayloadJson.message).toEqual(
        "Missing authentication"
      );
    });
  });

  describe("when GET /threads", () => {
    it("should have a response with a 200 status code and return thread detail", async () => {
      const server = await createServer({
        addUserUseCase,
        loginUserUseCase,
        addThreadUseCase,
        addCommentUseCase,
        addReplyUseCase,
        getThreadDetailUseCase,
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
          content: "this is a comment",
        },
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const addCommentResponsePayloadJson = JSON.parse(
        addCommentResponse.payload
      );

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

      const getThreadDetailResponsePayloadJson = JSON.parse(
        getThreadDetailResponse.payload
      );

      const { thread } = getThreadDetailResponsePayloadJson.data;

      expect(getThreadDetailResponse.statusCode).toEqual(200);
      expect(getThreadDetailResponsePayloadJson.status).toEqual("success");
      expect(thread).toBeDefined();
    });

    it("should have a response with a 404 status code if the thread is not found", async () => {
      const server = await createServer({
        getThreadDetailUseCase,
      } satisfies Partial<CreateServerDependencies> as CreateServerDependencies);

      const getThreadDetailResponse = await server.inject({
        method: "GET",
        url: `/threads/thread-123`,
      });

      const getThreadDetailResponsePayloadJson = JSON.parse(
        getThreadDetailResponse.payload
      );

      expect(getThreadDetailResponse.statusCode).toEqual(404);
      expect(getThreadDetailResponsePayloadJson.status).toEqual("fail");
      expect(getThreadDetailResponsePayloadJson.message).toEqual(
        THREAD_REPOSITORY_ERROR_MESSAGE.THREAD_NOT_FOUND
      );
    });
  });
});
