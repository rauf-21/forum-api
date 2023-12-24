import { CommentRepository } from "../../domains/comments/comment-repository";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { CommentOwnerContext } from "../../domains/comments/entities/comment-owner-context";
import { ThreadRepository } from "../../domains/threads/thread-repository";

interface SoftDeleteCommentUseCaseDependencies {
  threadRepository: ThreadRepository;
  commentRepository: CommentRepository;
}

export class SoftDeleteCommentUseCase {
  readonly #threadRepository;

  readonly #commentRepository;

  constructor(dependencies: SoftDeleteCommentUseCaseDependencies) {
    const { threadRepository, commentRepository } = dependencies;

    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
  }

  async execute(payload: unknown) {
    const commentLocatorContext = new CommentLocatorContext(payload);

    await this.#threadRepository.verifyThreadIsExists(
      commentLocatorContext.threadId
    );
    await this.#commentRepository.verifyCommentIsExists(commentLocatorContext);

    const commentOwnerContext = new CommentOwnerContext(payload);

    await this.#commentRepository.verifyUserIsCommentOwner(commentOwnerContext);
    await this.#commentRepository.softDeleteCommentById(commentOwnerContext.id);
  }
}
