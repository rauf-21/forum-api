import { RegisterUser } from "../../domains/users/entities/register-user";
import { UserRepository } from "../../domains/users/user-repository";
import { PasswordHash } from "../security/password-hash";

interface AddUserUseCaseDependencies {
  userRepository: UserRepository;
  passwordHash: PasswordHash;
}

export class AddUserUseCase {
  readonly #userRepository: UserRepository;

  readonly #passwordHash: PasswordHash;

  constructor(dependencies: AddUserUseCaseDependencies) {
    const { userRepository, passwordHash } = dependencies;

    this.#userRepository = userRepository;
    this.#passwordHash = passwordHash;
  }

  async execute(useCasePayload: unknown) {
    const registerUser = new RegisterUser(useCasePayload);

    await this.#userRepository.verifyUsernameIsAvailable(registerUser.username);

    const hashedPassword = await this.#passwordHash.hash(registerUser.password);

    const registeredUser = await this.#userRepository.addUser({
      ...registerUser,
      password: hashedPassword,
    });

    return registeredUser;
  }
}
