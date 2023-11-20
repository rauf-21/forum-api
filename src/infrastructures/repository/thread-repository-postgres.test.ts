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
      const threadRepository = new ThreadRepositoryPostgres(db, nanoid);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({
        id: owner,
        username: "bono",
      });

      const payload = new NewThread({
        title: "this is a title",
        body: "this is a body",
        owner,
      });

      const addedThread = await threadRepository.addThread(payload);

      expect(addedThread.id).toBeDefined();
      expect(addedThread.title).toEqual(payload.title);
      expect(addedThread.owner).toEqual(owner);
    });
  });

  describe("verifyThreadIsExists method", () => {
    it("should be able to verify if a thread exists in the database", async () => {
      const threadRepository = new ThreadRepositoryPostgres(db, nanoid);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({ id: owner, username: "bono" });

      const newThread = new NewThread({
        title: "this is a title",
        body: "this is a content",
        owner,
      });

      const addedThread = await threadRepository.addThread(newThread);

      const result = await threadRepository.verifyThreadIsExists(
        addedThread.id
      );

      expect(result).toEqual(undefined);
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
      };

      await UsersTableTestHelper.addUser(addUserPayload);

      const thread = {
        id: "thread-123",
        owner: addUserPayload.id,
      };

      await ThreadsTableTestHelper.addThread(thread);

      const addedThread = await ThreadsTableTestHelper.findThreadById(
        thread.id
      );

      const result = await threadRepository.getThreadById(thread.id);

      expect(addedThread).toStrictEqual(result);
    });

    it("should throw an error when the thread is not found", async () => {
      const threadRepository = new ThreadRepositoryPostgres(db, nanoid);

      await expect(
        threadRepository.getThreadById("thread-123")
      ).rejects.toThrow(THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
    });
  });
});
