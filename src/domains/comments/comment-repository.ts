import { Selectable } from "kysely";
import { Comments } from "kysely-codegen";

import { AddedComment } from "./entities/added-comment";
import { CommentLocatorContext } from "./entities/comment-locator-context";
import { CommentOwnerContext } from "./entities/comment-owner-context";
import { NewComment } from "./entities/new-comment";

type Comment = Selectable<Comments>;

export interface CommentRepository {
  addComment(newComment: NewComment): Promise<AddedComment>;
  verifyUserIsCommentOwner(
    commentOwnerContext: CommentOwnerContext
  ): Promise<void>;
  verifyCommentIsExists(
    commentLocatorContext: CommentLocatorContext
  ): Promise<void>;
  softDeleteCommentById(id: string): Promise<void>;
  getCommentsByThreadId(threadId: string): Promise<Comment[]>;
}
