import { REPLY_REPOSITORY_ERROR } from "../../commons/constants/domains/replies/reply-repository-error";
import { AddedReply } from "../../domains/replies/entites/added-reply";
import { NewReply } from "../../domains/replies/entites/new-reply";
import { ReplyLocatorContext } from "../../domains/replies/entites/reply-locator-context";
import { ReplyOwnerContext } from "../../domains/replies/entites/reply-owner.context";
import { ReplyRepository } from "../../domains/replies/reply-repository";
import { db as postgresDb } from "../database/postgres/db";

type DB = typeof postgresDb;

type IdGenerator = () => string;

export class ReplyRepositoryPostgres implements ReplyRepository {
  readonly #db: DB;

  readonly #idGenerator: IdGenerator;

  constructor(db: DB, idGenerator: IdGenerator) {
    this.#db = db;
    this.#idGenerator = idGenerator;
  }

  async addReply(newReply: NewReply) {
    const { content, owner, commentId } = newReply;

    const id = `reply-${this.#idGenerator()}`;

    const addedReply = await this.#db
      .insertInto("replies")
      .values({ id, content, owner, commentId })
      .returning(["id", "content", "owner"])
      .executeTakeFirst();

    return new AddedReply(addedReply);
  }

  async verifyUserIsReplyOwner(replyOwnerContext: ReplyOwnerContext) {
    const { id, owner } = replyOwnerContext;

    const result = await this.#db
      .selectNoFrom(({ exists, selectFrom }) =>
        exists(
          selectFrom("replies")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ and, eb }) =>
              and([eb("id", "=", id), eb("owner", "=", owner)])
            )
        ).as("isUserReplyOwner")
      )
      .executeTakeFirst();

    if (!result || !result.isUserReplyOwner) {
      throw new Error(REPLY_REPOSITORY_ERROR.UNAUTHORIZED_REPLY_DELETION);
    }
  }

  async verifyReplyIsExists(replyLocatorContext: ReplyLocatorContext) {
    const { id, commentId } = replyLocatorContext;

    const result = await this.#db
      .selectNoFrom(({ exists, selectFrom }) =>
        exists(
          selectFrom("replies")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ and, eb }) =>
              and([eb("id", "=", id), eb("commentId", "=", commentId)])
            )
        ).as("isReplyExists")
      )
      .executeTakeFirst();

    if (!result || !result.isReplyExists) {
      throw new Error(REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND);
    }
  }

  async softDeleteReplyById(id: string) {
    await this.#db
      .updateTable("replies")
      .set({ isDeleted: true })
      .where("id", "=", id)
      .execute();
  }

  async getRepliesByCommentId(commentId: string) {
    const replies = await this.#db
      .selectFrom("replies")
      .selectAll()
      .where("commentId", "=", commentId)
      .orderBy("date asc")
      .execute();

    return replies;
  }
}
