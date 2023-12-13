/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { Selectable } from "kysely";
import { Comments } from "kysely-codegen";

import { COMMENT_LIKE_REPOSITORY_ERROR } from "../../commons/constants/domains/comment-likes/comment-like-repository-error";
import { CommentOwnerContext } from "../comments/entities/comment-owner-context";

type Comment = Selectable<Comments>;

export abstract class CommentLikeRepository {
  async isCommentLiked(
    commentOwnerContext: CommentOwnerContext
  ): Promise<boolean> {
    throw new Error(COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async likeComment(commentOwnerContext: CommentOwnerContext): Promise<void> {
    throw new Error(COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async unlikeComment(commentOwnerContext: CommentOwnerContext): Promise<void> {
    throw new Error(COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async getCommentLikeCountByCommentId(
    commentId: Comment["id"]
  ): Promise<number> {
    throw new Error(COMMENT_LIKE_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }
}
