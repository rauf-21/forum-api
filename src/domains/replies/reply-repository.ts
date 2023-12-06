/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { Selectable } from "kysely";
import { Replies } from "kysely-codegen";

import { REPLY_REPOSITORY_ERROR } from "../../commons/constants/domains/replies/reply-repository-error";
import { AddedReply } from "./entites/added-reply";
import { NewReply } from "./entites/new-reply";
import { ReplyLocatorContext } from "./entites/reply-locator-context";
import { ReplyOwnerContext } from "./entites/reply-owner.context";

type Reply = Selectable<Replies>;

export abstract class ReplyRepository {
  async addReply(newReply: NewReply): Promise<AddedReply> {
    throw new Error(REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyUserIsReplyOwner(
    replyOwnerContext: ReplyOwnerContext
  ): Promise<void> {
    throw new Error(REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyReplyIsExists(
    replyLocatorContext: ReplyLocatorContext
  ): Promise<void> {
    throw new Error(REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async softDeleteReplyById(id: string): Promise<void> {
    throw new Error(REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async getRepliesByCommentId(commentId: string): Promise<Reply[]> {
    throw new Error(REPLY_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }
}
