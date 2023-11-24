import * as jme from "jest-mock-extended";

import { AddedThread } from "../../domains/threads/entities/added-thread";
import { NewThread } from "../../domains/threads/entities/new-thread";
import { ThreadRepository } from "../../domains/threads/thread-repository";
import { AddThreadUseCase } from "./add-thread-use-case";

describe("AddThreadUseCase", () => {
  it("should orchestrate the add thread action correctly", async () => {
    const useCasePayload = {
      title: "this is a title",
      body: "this is a body",
      owner: "user-123",
    };

    const mockThreadRepository = jme.mock<ThreadRepository>();

    mockThreadRepository.addThread.mockResolvedValue(
      new AddedThread({
        id: "thread-123",
        title: useCasePayload.title,
        owner: useCasePayload.owner,
      })
    );

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const addedThread = await addThreadUseCase.execute(useCasePayload);

    expect(addedThread).toStrictEqual(
      new AddedThread({
        id: "thread-123",
        title: useCasePayload.title,
        owner: useCasePayload.owner,
      })
    );
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(
      new NewThread(useCasePayload)
    );
  });
});
