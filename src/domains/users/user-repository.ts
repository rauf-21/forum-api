/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { Selectable } from "kysely";
import { Users } from "kysely-codegen";

import { USER_REPOSITORY_ERROR } from "../../commons/constants/domains/users/user-repository-error";
import { RegisterUser } from "./entities/register-user";
import { RegisteredUser } from "./entities/registered-user";

type User = Selectable<Users>;

export abstract class UserRepository {
  async addUser(registerUser: RegisterUser): Promise<RegisteredUser> {
    throw new Error(USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async verifyUsernameIsAvailable(username: string): Promise<void> {
    throw new Error(USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async getUserByUsername(username: string): Promise<User> {
    throw new Error(USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }

  async getUsernameById(id: string): Promise<User["username"]> {
    throw new Error(USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
  }
}
