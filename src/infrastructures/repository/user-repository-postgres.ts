import { USER_REPOSITORY_ERROR } from "../../commons/constants/domains/users/user-repository-error";
import { RegisterUser } from "../../domains/users/entities/register-user";
import { RegisteredUser } from "../../domains/users/entities/registered-user";
import { UserRepository } from "../../domains/users/user-repository";
import { db as postgresDb } from "../database/postgres/db";

type DB = typeof postgresDb;

type IdGenerator = () => string;

export class UserRepositoryPostgres implements UserRepository {
  readonly #db: DB;

  readonly #idGenerator: IdGenerator;

  constructor(db: typeof postgresDb, idGenerator: () => string) {
    this.#db = db;
    this.#idGenerator = idGenerator;
  }

  async verifyUsernameIsAvailable(username: string) {
    const result = await this.#db
      .selectFrom("users")
      .select("username")
      .where("username", "=", username)
      .executeTakeFirst();

    if (result !== undefined) {
      throw new Error(USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND);
    }
  }

  async addUser(registerUser: RegisterUser) {
    const { username, password, fullname } = registerUser;
    const id = `user-${this.#idGenerator()}`;
    const result = await this.#db
      .insertInto("users")
      .values({ id, username, password, fullname })
      .returning(["id", "username", "fullname"])
      .executeTakeFirst();

    return new RegisteredUser(result);
  }

  async getUserByUsername(username: string) {
    const user = await this.#db
      .selectFrom("users")
      .selectAll()
      .where("username", "=", username)
      .executeTakeFirst();

    if (user === undefined) {
      throw new Error(USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND);
    }

    return user;
  }

  async getUsernameById(id: string) {
    const result = await this.#db
      .selectFrom("users")
      .select(["username"])
      .where("id", "=", id)
      .executeTakeFirst();

    if (!result) {
      throw new Error(USER_REPOSITORY_ERROR.USER_NOT_FOUND);
    }

    return result.username;
  }
}
