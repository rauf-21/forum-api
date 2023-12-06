import { THREAD_REPOSITORY_ERROR } from "../../commons/constants/domains/threads/thread-repository-error";
import { AddedThread } from "../../domains/threads/entities/added-thread";
import { NewThread } from "../../domains/threads/entities/new-thread";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { db as postgresDb } from "../database/postgres/db";

type DB = typeof postgresDb;

type IdGenerator = () => string;

export class ThreadRepositoryPostgres extends ThreadRepository {
  readonly #db: DB;

  readonly #idGenerator: IdGenerator;

  constructor(db: DB, idGenerator: IdGenerator) {
    super();

    this.#db = db;
    this.#idGenerator = idGenerator;
  }

  async addThread(newThread: NewThread) {
    const { title, body, owner } = newThread;

    const id = `thread-${this.#idGenerator()}`;

    const result = await this.#db
      .insertInto("threads")
      .values({ id, title, body, owner })
      .returning(["id", "title", "owner"])
      .executeTakeFirst();

    return new AddedThread(result);
  }

  async verifyThreadIsExists(id: string) {
    const result = await this.#db
      .selectNoFrom(({ exists, selectFrom }) =>
        exists(
          selectFrom("threads")
            .select(({ lit }) => lit(1).as("one"))
            .where("id", "=", id)
        ).as("isThreadExists")
      )
      .executeTakeFirst();

    if (!result || !result.isThreadExists) {
      throw new Error(THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
    }
  }

  async getThreadById(id: string) {
    const thread = await this.#db
      .selectFrom("threads")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    if (!thread) {
      throw new Error(THREAD_REPOSITORY_ERROR.THREAD_NOT_FOUND);
    }

    return thread;
  }
}
