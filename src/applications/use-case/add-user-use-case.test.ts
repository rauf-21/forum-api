import * as jme from "jest-mock-extended";

import { RegisterUser } from "../../domains/users/entities/register-user";
import { RegisteredUser } from "../../domains/users/entities/registered-user";
import { UserRepository } from "../../domains/users/user-repository";
import { PasswordHash } from "../security/password-hash";
import { AddUserUseCase } from "./add-user-use-case";

describe("AddUserUseCase", () => {
  it("should orchestrate the add user action correctly", async () => {
    const useCasePayload = {
      username: "dicoding",
      password: "secret",
      fullname: "Dicoding Indonesia",
    };

    const mockUserRepository = jme.mock<UserRepository>();

    mockUserRepository.verifyUsernameIsAvailable.mockResolvedValue(undefined);
    mockUserRepository.addUser.mockResolvedValue(
      new RegisteredUser({
        id: "user-123",
        username: useCasePayload.username,
        fullname: useCasePayload.fullname,
      })
    );

    const mockPasswordHash = jme.mock<PasswordHash>();

    mockPasswordHash.hash.mockResolvedValue("hashed_password");

    const getUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    const registeredUser = await getUserUseCase.execute(useCasePayload);

    expect(registeredUser).toStrictEqual(
      new RegisteredUser({
        id: "user-123",
        username: useCasePayload.username,
        fullname: useCasePayload.fullname,
      })
    );
    expect(mockUserRepository.verifyUsernameIsAvailable).toHaveBeenCalledWith(
      useCasePayload.username
    );
    expect(mockPasswordHash.hash).toHaveBeenCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toHaveBeenCalledWith(
      new RegisterUser({
        username: useCasePayload.username,
        password: "hashed_password",
        fullname: useCasePayload.fullname,
      })
    );
  });
});
