/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { Selectable } from "kysely";
import { Comments } from "kysely-codegen";

import { COMMENT_REPOSITORY_ERROR } from "../../commons/constants/domains/comments/comment-repository-error";
import { AddedComment } from "./entities/added-comment";
import { CommentLocatorContext } from "./entities/comment-locator-context";
import { CommentOwnerContext } from "./entities/comment-owner-context";
import { NewComment } from "./entities/new-comment";

type Comment = Selectable<Comments>;

export abstract class CommentRepository {
  async addComment(newComment: NewComment): Promise<AddedComment> {
    throw new Error(COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyUserIsCommentOwner(
    commentOwnerContext: CommentOwnerContext
  ): Promise<void> {
    throw new Error(COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyCommentIsExists(
    commentLocatorContext: CommentLocatorContext
  ): Promise<void> {
    throw new Error(COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async softDeleteCommentById(id: string): Promise<void> {
    throw new Error(COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async getCommentsByThreadId(threadId: string): Promise<Comment[]> {
    throw new Error(COMMENT_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }
}
