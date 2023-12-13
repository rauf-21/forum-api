import { z } from "zod";

import { GET_THREAD_DETAIL_USE_CASE_ERROR } from "../../commons/constants/applications/use-case/get-thread-detail-use-case-error";
import { GET_THREAD_DETAIL_USE_CASE_TEXT } from "../../commons/constants/applications/use-case/get-thread-detail-use-case-text";
import { CommentLikeRepository } from "../../domains/comment-likes/comment-like-repository";
import { CommentRepository } from "../../domains/comments/comment-repository";
import { ReplyRepository } from "../../domains/replies/reply-repository";
import { ThreadDetail } from "../../domains/threads/entities/thread-detail";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { UserRepository } from "../../domains/users/user-repository";

const GetThreadDetailUseCasePayloadSchema = z.object({
  threadId: z.string({
    required_error: GET_THREAD_DETAIL_USE_CASE_ERROR.MISSING_PROPERTY,
    invalid_type_error: GET_THREAD_DETAIL_USE_CASE_ERROR.INVALID_DATA_TYPE,
  }),
});

export interface GetThreadDetailUseCaseDependencies {
  userRepository: UserRepository;
  threadRepository: ThreadRepository;
  commentRepository: CommentRepository;
  replyRepository: ReplyRepository;
  commentLikeRepository: CommentLikeRepository;
}

export class GetThreadDetailUseCase {
  readonly #userRepository;

  readonly #threadRepository;

  readonly #commentRepository;

  readonly #replyRepository;

  readonly #commentLikeRepository;

  constructor(dependencies: GetThreadDetailUseCaseDependencies) {
    const {
      userRepository,
      threadRepository,
      commentRepository,
      replyRepository,
      commentLikeRepository,
    } = dependencies;

    this.#userRepository = userRepository;
    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
    this.#replyRepository = replyRepository;
    this.#commentLikeRepository = commentLikeRepository;
  }

  async execute(payload: unknown) {
    const result = GetThreadDetailUseCasePayloadSchema.safeParse(payload);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;

      throw new Error(errorMessage);
    }

    const { threadId } = result.data;

    const thread = await this.#threadRepository.getThreadById(threadId);

    const threadOwnerUsername = await this.#userRepository.getUsernameById(
      thread.owner
    );

    const comments = await this.#commentRepository.getCommentsByThreadId(
      thread.id
    );

    const formattedComments = await Promise.all(
      comments.map(async (comment) => {
        const commenterUsername = await this.#userRepository.getUsernameById(
          comment.owner
        );

        const replies = await this.#replyRepository.getRepliesByCommentId(
          comment.id
        );

        const commentContent = comment.isDeleted
          ? GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_COMMENT
          : comment.content;

        const likeCount =
          await this.#commentLikeRepository.getCommentLikeCountByCommentId(
            comment.id
          );

        const formattedReplies = await Promise.all(
          replies.map(async (reply) => {
            const replierUsername = await this.#userRepository.getUsernameById(
              reply.owner
            );

            const replyContent = reply.isDeleted
              ? GET_THREAD_DETAIL_USE_CASE_TEXT.SOFT_DELETED_REPLY
              : reply.content;

            return {
              id: reply.id,
              date: reply.date,
              username: replierUsername,
              content: replyContent,
            };
          })
        );

        return {
          id: comment.id,
          date: comment.date,
          username: commenterUsername,
          content: commentContent,
          likeCount,
          replies: formattedReplies,
        };
      })
    );

    return new ThreadDetail({
      id: thread.id,
      title: thread.title,
      body: thread.body,
      date: thread.date,
      username: threadOwnerUsername,
      comments: formattedComments,
    });
  }
}
