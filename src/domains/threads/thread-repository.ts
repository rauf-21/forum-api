/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { Selectable } from "kysely";
import { Threads } from "kysely-codegen";

import { THREAD_REPOSITORY_ERROR } from "../../commons/constants/domains/threads/thread-repository-error";
import { AddedThread } from "./entities/added-thread";
import { NewThread } from "./entities/new-thread";

type Thread = Selectable<Threads>;

export abstract class ThreadRepository {
  async addThread(newThread: NewThread): Promise<AddedThread> {
    throw new Error(THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyThreadIsExists(id: string): Promise<void> {
    throw new Error(THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async getThreadById(id: string): Promise<Thread> {
    throw new Error(THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }
}
