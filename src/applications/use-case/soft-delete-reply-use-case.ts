import { ReplyLocatorContext } from "../../domains/replies/entites/reply-locator-context";
import { ReplyOwnerContext } from "../../domains/replies/entites/reply-owner.context";
import { ReplyRepository } from "../../domains/replies/reply-repository";

interface SoftDeleteReplyUseCaseDependencies {
  replyRepository: ReplyRepository;
}

export class SoftDeleteReplyUseCase {
  readonly #replyRepository: ReplyRepository;

  constructor(dependencies: SoftDeleteReplyUseCaseDependencies) {
    const { replyRepository } = dependencies;

    this.#replyRepository = replyRepository;
  }

  async execute(payload: unknown) {
    const replyLocatorContext = new ReplyLocatorContext(payload);

    await this.#replyRepository.verifyReplyIsExists(replyLocatorContext);

    const replyOwnerContext = new ReplyOwnerContext(payload);

    await this.#replyRepository.verifyUserIsReplyOwner(replyOwnerContext);
    await this.#replyRepository.softDeleteReplyById(replyOwnerContext.id);
  }
}
