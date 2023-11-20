import { Selectable } from "kysely";
import { Replies } from "kysely-codegen";

import { AddedReply } from "./entites/added-reply";
import { NewReply } from "./entites/new-reply";
import { ReplyLocatorContext } from "./entites/reply-locator-context";
import { ReplyOwnerContext } from "./entites/reply-owner.context";

type Reply = Selectable<Replies>;

export interface ReplyRepository {
  addReply(newReply: NewReply): Promise<AddedReply>;
  verifyUserIsReplyOwner(replyOwnerContext: ReplyOwnerContext): Promise<void>;
  verifyReplyIsExists(replyLocatorContext: ReplyLocatorContext): Promise<void>;
  softDeleteReplyById(id: string): Promise<void>;
  getRepliesByCommentId(commentId: string): Promise<Reply[]>;
}
