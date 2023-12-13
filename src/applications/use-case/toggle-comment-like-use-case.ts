import { CommentLikeRepository } from "../../domains/comment-likes/comment-like-repository";
import { CommentRepository } from "../../domains/comments/comment-repository";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { CommentOwnerContext } from "../../domains/comments/entities/comment-owner-context";
import { ThreadRepository } from "../../domains/threads/thread-repository";

interface ToggleCommentLikeUseCaseDependencies {
  threadRepository: ThreadRepository;
  commentRepository: CommentRepository;
  commentLikeRepository: CommentLikeRepository;
}

export class ToggleCommentLikeUseCase {
  readonly #threadRepository: ThreadRepository;

  readonly #commentRepository: CommentRepository;

  readonly #commentLikeRepository: CommentLikeRepository;

  constructor(dependencies: ToggleCommentLikeUseCaseDependencies) {
    const { threadRepository, commentRepository, commentLikeRepository } =
      dependencies;

    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
    this.#commentLikeRepository = commentLikeRepository;
  }

  async execute(payload: unknown) {
    const commentLocatorContext = new CommentLocatorContext(payload);

    const commentOwnerContext = new CommentOwnerContext(payload);

    await this.#threadRepository.verifyThreadIsExists(
      commentLocatorContext.threadId
    );
    await this.#commentRepository.verifyCommentIsExists(commentLocatorContext);

    const isCommentLiked =
      await this.#commentLikeRepository.isCommentLiked(commentOwnerContext);

    if (isCommentLiked) {
      await this.#commentLikeRepository.unlikeComment(commentOwnerContext);
      return;
    }

    await this.#commentLikeRepository.likeComment(commentOwnerContext);
  }
}
