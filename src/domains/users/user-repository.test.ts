import { USER_REPOSITORY_ERROR } from "../../commons/constants/domains/users/user-repository-error";
import { RegisterUser } from "./entities/register-user";
import { UserRepository } from "./user-repository";

describe("UserRepository", () => {
  it("should throw an error if an unimplemented method is called", async () => {
    // @ts-expect-error create an instance of an abstract class
    const userRepository = new UserRepository() as UserRepository;

    await expect(userRepository.addUser({} as RegisterUser)).rejects.toThrow(
      USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(userRepository.verifyUsernameIsAvailable("")).rejects.toThrow(
      USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(userRepository.getUserByUsername("")).rejects.toThrow(
      USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
    await expect(userRepository.getUsernameById("")).rejects.toThrow(
      USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED
    );
  });
});
