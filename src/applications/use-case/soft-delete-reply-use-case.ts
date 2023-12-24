import { z } from "zod";

import { SOFT_DELETE_REPLY_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/soft-delete-reply-use-case-error";
import { CommentRepository } from "../../domains/comments/comment-repository";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { ReplyLocatorContext } from "../../domains/replies/entites/reply-locator-context";
import { ReplyOwnerContext } from "../../domains/replies/entites/reply-owner.context";
import { ReplyRepository } from "../../domains/replies/reply-repository";
import { ThreadRepository } from "../../domains/threads/thread-repository";

const SoftDeleteReplyUseCasePayloadSchema = z.object({
  id: z.string({
    required_error: SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY,
    invalid_type_error: SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE,
  }),
  owner: z.string({
    required_error: SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY,
    invalid_type_error: SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE,
  }),
  threadId: z.string({
    required_error: SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY,
    invalid_type_error: SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE,
  }),
  commentId: z.string({
    required_error: SOFT_DELETE_REPLY_USE_CASE_ERROR.MISSING_PROPERTY,
    invalid_type_error: SOFT_DELETE_REPLY_USE_CASE_ERROR.INVALID_DATA_TYPE,
  }),
});

export interface SoftDeleteReplyUseCaseDependencies {
  threadRepository: ThreadRepository;
  commentRepository: CommentRepository;
  replyRepository: ReplyRepository;
}

export class SoftDeleteReplyUseCase {
  readonly #threadRepository;

  readonly #commentRepository;

  readonly #replyRepository;

  constructor(dependencies: SoftDeleteReplyUseCaseDependencies) {
    const { threadRepository, commentRepository, replyRepository } =
      dependencies;

    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
    this.#replyRepository = replyRepository;
  }

  async execute(payload: unknown) {
    const result = SoftDeleteReplyUseCasePayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { threadId, commentId } = result.data;

    const commentLocatorContext = new CommentLocatorContext({
      id: commentId,
      threadId,
    });

    const replyLocatorContext = new ReplyLocatorContext(payload);

    await this.#threadRepository.verifyThreadIsExists(threadId);
    await this.#commentRepository.verifyCommentIsExists(commentLocatorContext);
    await this.#replyRepository.verifyReplyIsExists(replyLocatorContext);

    const replyOwnerContext = new ReplyOwnerContext(payload);

    await this.#replyRepository.verifyUserIsReplyOwner(replyOwnerContext);
    await this.#replyRepository.softDeleteReplyById(replyOwnerContext.id);
  }
}
