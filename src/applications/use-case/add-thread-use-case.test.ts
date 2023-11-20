import { AddedThread } from "../../domains/threads/entities/added-thread";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { AddThreadUseCase } from "./add-thread-use-case";

describe("AddThreadUseCase", () => {
  it("should orchestrate the add thread action correctly", async () => {
    const useCasePayload = {
      title: "this is a title",
      body: "this is a body",
      owner: "user-123",
    };

    const mockAddedThread = new AddedThread({
      id: "thread-123",
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    });

    const mockThreadRepository = {
      addThread: jest.fn().mockResolvedValue(mockAddedThread),
    } satisfies Partial<ThreadRepository> as unknown as ThreadRepository;

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const addedThread = await addThreadUseCase.execute(useCasePayload);

    expect(addedThread).toStrictEqual(mockAddedThread);
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(useCasePayload);
  });
});
