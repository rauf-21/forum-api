"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thread_repository_error_1 = require("../../commons/constants/domains/threads/thread-repository-error");
const thread_repository_1 = require("./thread-repository");
describe("ThreadRepository", () => {
    it("should throw an error if an unimplemented method is called", async () => {
        // @ts-expect-error create an instance of an abstract class
        const threadRepository = new thread_repository_1.ThreadRepository();
        await expect(threadRepository.addThread({})).rejects.toThrow(thread_repository_error_1.THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(threadRepository.verifyThreadIsExists("")).rejects.toThrow(thread_repository_error_1.THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(threadRepository.getThreadById("")).rejects.toThrow(thread_repository_error_1.THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    });
});
