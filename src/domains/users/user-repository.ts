import { Selectable } from "kysely";
import { Users } from "kysely-codegen";

import { RegisterUser } from "./entities/register-user";
import { RegisteredUser } from "./entities/registered-user";

type User = Selectable<Users>;

export interface UserRepository {
  addUser(registerUser: RegisterUser): Promise<RegisteredUser>;
  verifyUsernameIsAvailable(username: string): Promise<void>;
  getUserByUsername(username: string): Promise<User>;
  getUsernameById(id: string): Promise<User["username"]>;
}
