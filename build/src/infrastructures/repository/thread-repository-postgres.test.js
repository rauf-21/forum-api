"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const threads_table_test_helper_1 = require("../../../tests/threads-table-test-helper");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const thread_repository_error_1 = require("../../commons/constants/domains/threads/thread-repository-error");
const new_thread_1 = require("../../domains/threads/entities/new-thread");
const db_1 = require("../database/postgres/db");
const thread_repository_postgres_1 = require("./thread-repository-postgres");
describe("ThreadRepository postgres", () => {
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
    });
    describe("addThread method", () => {
        it("should be able to add a thread to the database", async () => {
            const fakeIdGenerator = () => "123";
            const threadRepository = new thread_repository_postgres_1.ThreadRepositoryPostgres(db_1.db, fakeIdGenerator);
            const owner = "user-123";
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: owner,
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const payload = new new_thread_1.NewThread({
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
            const threadRepository = new thread_repository_postgres_1.ThreadRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const owner = "user-123";
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: owner,
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const newThread = new new_thread_1.NewThread({
                title: "this is a title",
                body: "this is a content",
                owner,
            });
            const addedThread = await threadRepository.addThread(newThread);
            await expect(threadRepository.verifyThreadIsExists(addedThread.id)).resolves.not.toThrow(Error);
        });
        it("should be able to verify if a thread does not exist in the database", async () => {
            const threadRepository = new thread_repository_postgres_1.ThreadRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            await expect(threadRepository.verifyThreadIsExists("thread-123")).rejects.toThrow(thread_repository_error_1.THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
        });
    });
    describe("getThreadById method", () => {
        it("should return the thread correctly", async () => {
            const threadRepository = new thread_repository_postgres_1.ThreadRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const addUserPayload = {
                id: "user-123",
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            await users_table_test_helper_1.UsersTableTestHelper.addUser(addUserPayload);
            const newThread = {
                id: "thread-123",
                owner: addUserPayload.id,
                title: "this is a title",
                body: "this is a body",
            };
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread(newThread);
            const addedThread = await threads_table_test_helper_1.ThreadsTableTestHelper.findThreadById(newThread.id);
            const thread = await threadRepository.getThreadById(newThread.id);
            expect(thread).toStrictEqual(addedThread);
        });
        it("should throw an error when the thread is not found", async () => {
            const threadRepository = new thread_repository_postgres_1.ThreadRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            await expect(threadRepository.getThreadById("thread-123")).rejects.toThrow(thread_repository_error_1.THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
        });
    });
});
