import { CommentLikeRepository } from "../../domains/comment-likes/comment-like-repository";
import { CommentOwnerContext } from "../../domains/comments/entities/comment-owner-context";
import { db as postgresDb } from "../database/postgres/db";

type DB = typeof postgresDb;

type IdGenerator = () => string;

export class CommentLikeRepositoryPostgres extends CommentLikeRepository {
  readonly #db: DB;

  readonly #idGenerator: IdGenerator;

  constructor(db: DB, idGenerator: IdGenerator) {
    super();

    this.#db = db;
    this.#idGenerator = idGenerator;
  }

  async isCommentLiked(commentOwnerContext: CommentOwnerContext) {
    const { id: commentId, owner } = commentOwnerContext;

    const result = await this.#db
      .selectFrom("commentLikes")
      .select(({ lit }) => lit(1).as("one"))
      .where(({ eb, and }) =>
        and([eb("commentId", "=", commentId), eb("owner", "=", owner)])
      )
      .limit(1)
      .executeTakeFirst();

    return result !== undefined;
  }

  async likeComment(commentOwnerContext: CommentOwnerContext) {
    const { id: commentId, owner } = commentOwnerContext;

    const id = `comment-like-${this.#idGenerator()}`;

    await this.#db
      .insertInto("commentLikes")
      .values({
        id,
        commentId,
        owner,
      })
      .execute();
  }

  async unlikeComment(commentOwnerContext: CommentOwnerContext) {
    const { id: commentId, owner } = commentOwnerContext;

    await this.#db
      .deleteFrom("commentLikes")
      .where(({ eb, and }) =>
        and([eb("commentId", "=", commentId), eb("owner", "=", owner)])
      )
      .execute();
  }

  async getCommentLikeCountByCommentId(commentId: string) {
    const result = await this.#db
      .selectFrom("commentLikes")
      .select(({ fn }) => fn.count<string>("id").as("commentLikeCount"))
      .where("commentId", "=", commentId)
      .executeTakeFirst();

    // The query above is guaranteed to always return a value,
    // even if the commentId is not found.
    // This branch is just a countermeasure.
    // istanbul ignore if
    if (result === undefined) {
      throw new Error("something went wrong");
    }

    return parseInt(result.commentLikeCount, 10);
  }
}
