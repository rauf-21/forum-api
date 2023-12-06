import { THREAD_REPOSITORY_ERROR } from "../../commons/constants/domains/threads/thread-repository-error";
import { NewThread } from "./entities/new-thread";
import { ThreadRepository } from "./thread-repository";

describe("ThreadRepository", () => {
  it("should throw an error if an unimplemented method is called", async () => {
    // @ts-expect-error create an instance of an abstract class
    const threadRepository = new ThreadRepository() as ThreadRepository;

    await expect(threadRepository.addThread({} as NewThread)).rejects.toThrow(
      THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(threadRepository.verifyThreadIsExists("")).rejects.toThrow(
      THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(threadRepository.getThreadById("")).rejects.toThrow(
      THREAD_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
  });
});
