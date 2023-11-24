import { nanoid } from "nanoid";

import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { USER_REPOSITORY_ERROR } from "../../commons/constants/domains/users/user-repository-error";
import { RegisterUser } from "../../domains/users/entities/register-user";
import { RegisteredUser } from "../../domains/users/entities/registered-user";
import { db } from "../database/postgres/db";
import { UserRepositoryPostgres } from "./user-repository-postgres";

describe("UserRepositoryPostgres", () => {
  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("verifyUsernameIsAvailable method", () => {
    it("should be able to verify if the username is available", async () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(db, nanoid);

      await expect(
        userRepositoryPostgres.verifyUsernameIsAvailable("dicoding")
      ).resolves.not.toThrow(Error);
    });

    it("should throw an error if the username is not available", async () => {
      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
      });

      const userRepositoryPostgres = new UserRepositoryPostgres(db, nanoid);

      await expect(
        userRepositoryPostgres.verifyUsernameIsAvailable("dicoding")
      ).rejects.toThrow(USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND);
    });
  });

  describe("addUser method", () => {
    it("should be able to register user and return the registered user", async () => {
      const registerUser = new RegisterUser({
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      });

      const fakeIdGenerator = () => "123";

      const userRepositoryPostgres = new UserRepositoryPostgres(
        db,
        fakeIdGenerator
      );

      await userRepositoryPostgres.addUser(registerUser);

      const user = await UsersTableTestHelper.findUserById("user-123");

      expect(user).not.toEqual(undefined);
    });

    it("should return the registered user correctly", async () => {
      const registerUser = new RegisterUser({
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      });

      const fakeIdGenerator = () => "123";

      const userRepositoryPostgres = new UserRepositoryPostgres(
        db,
        fakeIdGenerator
      );

      const registeredUser = await userRepositoryPostgres.addUser(registerUser);

      expect(registeredUser).toStrictEqual(
        new RegisteredUser({
          id: "user-123",
          username: "bono",
          fullname: "bono bono",
        })
      );
    });
  });

  describe("getUserByUsername method", () => {
    it("should return the user if it is found", async () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(db, nanoid);

      await UsersTableTestHelper.addUser({
        id: "user-123",
        username: "dicoding",
        password: "secret_password",
      });

      const user = await userRepositoryPostgres.getUserByUsername("dicoding");

      expect(user).not.toEqual(undefined);
    });

    it("should throw an error if the user is not found", () => {
      const userRepositoryPostgres = new UserRepositoryPostgres(db, () => "");

      return expect(
        userRepositoryPostgres.getUserByUsername("dicoding")
      ).rejects.toThrow(USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND);
    });
  });

  describe("getUsernameById method", () => {
    it("should return the username correctly", async () => {
      const userRepository = new UserRepositoryPostgres(db, nanoid);

      const user = {
        id: "user-123",
        username: "bono",
      };

      await UsersTableTestHelper.addUser(user);

      const username = await userRepository.getUsernameById(user.id);

      expect(username).toEqual(user.username);
    });

    it("should throw an error when the user is not found", async () => {
      const userRepository = new UserRepositoryPostgres(db, nanoid);

      await expect(userRepository.getUsernameById("user-123")).rejects.toThrow(
        USER_REPOSITORY_ERROR.USER_NOT_FOUND
      );
    });
  });
});
