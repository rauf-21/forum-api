import { NewThread } from "../../domains/threads/entities/new-thread";
import { ThreadRepository } from "../../domains/threads/thread-repository";

interface AddThreadUseCaseDependencies {
  threadRepository: ThreadRepository;
}

export class AddThreadUseCase {
  readonly #threadRepository: ThreadRepository;

  constructor(dependencies: AddThreadUseCaseDependencies) {
    const { threadRepository } = dependencies;

    this.#threadRepository = threadRepository;
  }

  async execute(payload: unknown) {
    const newThread = new NewThread(payload);

    const addedThread = await this.#threadRepository.addThread(newThread);

    return addedThread;
  }
}
