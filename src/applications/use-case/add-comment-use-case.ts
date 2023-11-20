import { CommentRepository } from "../../domains/comments/comment-repository";
import { NewComment } from "../../domains/comments/entities/new-comment";
import { ThreadRepository } from "../../domains/threads/thread-repository";

interface AddCommentUseCaseDependencies {
  commentRepository: CommentRepository;
  threadRepository: ThreadRepository;
}

export class AddCommentUseCase {
  readonly #commentRepository: CommentRepository;

  readonly #threadRepository: ThreadRepository;

  constructor(dependencies: AddCommentUseCaseDependencies) {
    const { commentRepository, threadRepository } = dependencies;

    this.#commentRepository = commentRepository;
    this.#threadRepository = threadRepository;
  }

  async execute(payload: unknown) {
    const newComment = new NewComment(payload);

    await this.#threadRepository.verifyThreadIsExists(newComment.threadId);

    const addedComment = await this.#commentRepository.addComment(newComment);

    return addedComment;
  }
}
