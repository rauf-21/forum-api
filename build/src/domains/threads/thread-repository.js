"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadRepository = void 0;
const thread_repository_error_1 = require("../../commons/constants/domains/threads/thread-repository-error");
class ThreadRepository {
    async addThread(newThread) {
        throw new Error(thread_repository_error_1.THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyThreadIsExists(id) {
        throw new Error(thread_repository_error_1.THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async getThreadById(id) {
        throw new Error(thread_repository_error_1.THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
}
exports.ThreadRepository = ThreadRepository;
