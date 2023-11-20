import { COMMENT_REPOSITORY_ERROR } from "../../commons/constants/domains/comments/comment-repository-error";
import { CommentRepository } from "../../domains/comments/comment-repository";
import { AddedComment } from "../../domains/comments/entities/added-comment";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { CommentOwnerContext } from "../../domains/comments/entities/comment-owner-context";
import { NewComment } from "../../domains/comments/entities/new-comment";
import { db as postgresDb } from "../database/postgres/db";

type DB = typeof postgresDb;

type IdGenerator = () => string;

export class CommentRepositoryPostgres implements CommentRepository {
  readonly #db: DB;

  readonly #idGenerator: IdGenerator;

  constructor(db: DB, idGenerator: IdGenerator) {
    this.#db = db;
    this.#idGenerator = idGenerator;

    this.addComment = this.addComment.bind(this);
  }

  async addComment(newComment: NewComment) {
    const { content, owner, threadId } = newComment;

    const id = `comment-${this.#idGenerator()}`;

    const addedComment = await this.#db
      .insertInto("comments")
      .values({ id, content, owner, threadId })
      .returning(["id", "content", "owner"])
      .executeTakeFirst();

    return new AddedComment(addedComment);
  }

  async verifyUserIsCommentOwner(commentOwnerContext: CommentOwnerContext) {
    const { id, owner } = commentOwnerContext;

    const result = await this.#db
      .selectNoFrom(({ exists, selectFrom }) =>
        exists(
          selectFrom("comments")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ and, eb }) =>
              and([eb("id", "=", id), eb("owner", "=", owner)])
            )
        ).as("isUserTheCommentOwner")
      )
      .executeTakeFirst();

    if (!result || !result.isUserTheCommentOwner) {
      throw new Error(COMMENT_REPOSITORY_ERROR.UNAUTHORIZED_COMMENT_DELETION);
    }
  }

  async verifyCommentIsExists(commentLocatorContext: CommentLocatorContext) {
    const { id, threadId } = commentLocatorContext;

    const result = await this.#db
      .selectNoFrom(({ exists, selectFrom }) =>
        exists(
          selectFrom("comments")
            .select(({ lit }) => lit(1).as("one"))
            .where(({ and, eb }) =>
              and([eb("id", "=", id), eb("threadId", "=", threadId)])
            )
        ).as("isCommentExists")
      )
      .executeTakeFirst();

    if (!result || !result.isCommentExists) {
      throw new Error(COMMENT_REPOSITORY_ERROR.COMMENT_NOT_FOUND);
    }
  }

  async softDeleteCommentById(id: string) {
    await this.#db
      .updateTable("comments")
      .set({ isDeleted: true })
      .where("id", "=", id)
      .execute();
  }

  async getCommentsByThreadId(threadId: string) {
    const comments = await this.#db
      .selectFrom("comments")
      .selectAll()
      .where("threadId", "=", threadId)
      .orderBy("date asc")
      .execute();

    return comments;
  }
}
