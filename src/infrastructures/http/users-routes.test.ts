import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { REGISTER_USER_ERROR_MESSAGE } from "../../commons/constants/domains/users/register-user-error";
import { USER_REPOSITORY_ERROR_MESSAGE } from "../../commons/constants/domains/users/user-repository-error";
import { container } from "../container";
import { db } from "../database/postgres/db";
import { createServer, CreateServerDependencies } from "./create-server";

describe("/users endpoint", () => {
  const addUserUseCase = container.resolve("addUserUseCase");

  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  describe("when POST /users", () => {
    it("should have a response with a 201 status code and return the persisted user", async () => {
      const requestPayload = {
        username: "dicoding",
        password: "secret",
        fullname: "Dicoding Indonesia",
      };

      const server = await createServer({
        addUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedUser).toBeDefined();
    });

    it("should have a response with a 400 status code if the payload has a missing property", async () => {
      const requestPayload = {
        fullname: "Dicoding Indonesia",
        password: "secret",
      };

      const server = await createServer({
        addUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        REGISTER_USER_ERROR_MESSAGE.MISSING_PROPERTY
      );
    });

    it("should have a response with a 400 status code if the payload has an invalid data type", async () => {
      const requestPayload = {
        username: "dicoding",
        password: "secret",
        fullname: ["Dicoding Indonesia"],
      };

      const server = await createServer({
        addUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        REGISTER_USER_ERROR_MESSAGE.INVALID_DATA_TYPE
      );
    });

    it("should have a response with a 400 status code if the username contains more than 50 characters", async () => {
      const requestPayload = {
        username: "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
        password: "secret",
        fullname: "Dicoding Indonesia",
      };

      const server = await createServer({
        addUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        REGISTER_USER_ERROR_MESSAGE.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT
      );
    });

    it("should have a response with a 400 status code if the username contains a restricted character", async () => {
      const requestPayload = {
        username: "dicoding indonesia",
        password: "secret",
        fullname: "Dicoding Indonesia",
      };

      const server = await createServer({
        addUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        REGISTER_USER_ERROR_MESSAGE.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER
      );
    });

    it("should have a response with a 400 status code if the username is not available", async () => {
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
      });

      const requestPayload = {
        username: "dicoding",
        fullname: "Dicoding Indonesia",
        password: "super_secret",
      };

      const server = await createServer({
        addUserUseCase,
      } satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies);

      const response = await server.inject({
        method: "POST",
        url: "/users",
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        USER_REPOSITORY_ERROR_MESSAGE.USERNAME_NOT_FOUND
      );
    });
  });
});
