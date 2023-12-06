import { nanoid } from "nanoid";

import { ThreadsTableTestHelper } from "../../../tests/threads-table-test-helper";
import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { THREAD_REPOSITORY_ERROR } from "../../commons/constants/domains/threads/thread-repository-error";
import { NewThread } from "../../domains/threads/entities/new-thread";
import { db } from "../database/postgres/db";
import { ThreadRepositoryPostgres } from "./thread-repository-postgres";

describe("ThreadRepository postgres", () => {
  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe("addThread method", () => {
    it("should be able to add a thread to the database", async () => {
      const fakeIdGenerator = () => "123";

      const threadRepository = new ThreadRepositoryPostgres(
        db,
        fakeIdGenerator
      );

      const owner = "user-123";

      await UsersTableTestHelper.addUser({
        id: owner,
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      });

      const payload = new NewThread({
        title: "this is a title",
        body: "this is a body",
        owner,
      });

      const addedThread = await threadRepository.addThread(payload);

      expect(addedThread.id).toEqual("thread-123");
      expect(addedThread.title).toEqual(payload.title);
      expect(addedThread.owner).toEqual(owner);
    });
  });

  describe("verifyThreadIsExists method", () => {
    it("should be able to verify if a thread exists", async () => {
      const threadRepository = new ThreadRepositoryPostgres(db, nanoid);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({
        id: owner,
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      });

      const newThread = new NewThread({
        title: "this is a title",
        body: "this is a content",
        owner,
      });

      const addedThread = await threadRepository.addThread(newThread);

      await expect(
        threadRepository.verifyThreadIsExists(addedThread.id)
      ).resolves.not.toThrow(Error);
    });

    it("should be able to verify if a thread does not exist in the database", async () => {
      const threadRepository = new ThreadRepositoryPostgres(db, nanoid);

      await expect(
        threadRepository.verifyThreadIsExists("thread-123")
      ).rejects.toThrow(THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
    });
  });

  describe("getThreadById method", () => {
    it("should return the thread correctly", async () => {
      const threadRepository = new ThreadRepositoryPostgres(db, nanoid);

      const addUserPayload = {
        id: "user-123",
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      };

      await UsersTableTestHelper.addUser(addUserPayload);

      const newThread = {
        id: "thread-123",
        owner: addUserPayload.id,
        title: "this is a title",
        body: "this is a body",
      };

      await ThreadsTableTestHelper.addThread(newThread);

      const addedThread = await ThreadsTableTestHelper.findThreadById(
        newThread.id
      );

      const thread = await threadRepository.getThreadById(newThread.id);

      expect(thread).toStrictEqual(addedThread);
    });

    it("should throw an error when the thread is not found", async () => {
      const threadRepository = new ThreadRepositoryPostgres(db, nanoid);

      await expect(
        threadRepository.getThreadById("thread-123")
      ).rejects.toThrow(THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
    });
  });
});
