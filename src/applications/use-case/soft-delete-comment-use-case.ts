import { CommentRepository } from "../../domains/comments/comment-repository";
import { CommentLocatorContext } from "../../domains/comments/entities/comment-locator-context";
import { CommentOwnerContext } from "../../domains/comments/entities/comment-owner-context";

interface SoftDeleteCommentUseCaseDependencies {
  commentRepository: CommentRepository;
}

export class SoftDeleteCommentUseCase {
  readonly #commentRepository: CommentRepository;

  constructor(dependencies: SoftDeleteCommentUseCaseDependencies) {
    const { commentRepository } = dependencies;

    this.#commentRepository = commentRepository;
  }

  async execute(payload: unknown) {
    const commentLocatorContext = new CommentLocatorContext(payload);

    await this.#commentRepository.verifyCommentIsExists(commentLocatorContext);

    const commentOwnerContext = new CommentOwnerContext(payload);

    await this.#commentRepository.verifyUserIsCommentOwner(commentOwnerContext);
    await this.#commentRepository.softDeleteCommentById(commentOwnerContext.id);
  }
}
