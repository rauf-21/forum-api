import { CommentRepository } from "../../domains/comments/comment-repository";
import { NewReply } from "../../domains/replies/entites/new-reply";
import { ReplyRepository } from "../../domains/replies/reply-repository";
import { ThreadRepository } from "../../domains/threads/thread-repository";

interface AddReplyUseCaseDependencies {
  replyRepository: ReplyRepository;
  threadRepository: ThreadRepository;
  commentRepository: CommentRepository;
}

export class AddReplyUseCase {
  readonly #replyRepository: ReplyRepository;

  readonly #threadRepository: ThreadRepository;

  readonly #commentRepository: CommentRepository;

  constructor(dependencies: AddReplyUseCaseDependencies) {
    const { replyRepository, threadRepository, commentRepository } =
      dependencies;

    this.#replyRepository = replyRepository;
    this.#threadRepository = threadRepository;
    this.#commentRepository = commentRepository;
  }

  async execute(payload: unknown) {
    const newReply = new NewReply(payload);

    await this.#threadRepository.verifyThreadIsExists(newReply.threadId);

    await this.#commentRepository.verifyCommentIsExists({
      id: newReply.commentId,
      threadId: newReply.threadId,
    });

    const addedReply = await this.#replyRepository.addReply(newReply);

    return addedReply;
  }
}
