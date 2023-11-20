import { AUTHENTICATION_REPOSITORY_ERROR } from "../../commons/constants/domains/authentications/authentication-repository-error";
import { AuthenticationRepository } from "../../domains/authentications/authentication-repository";
import { db as postgresDb } from "../database/postgres/db";

type DB = typeof postgresDb;

export class AuthenticationRepositoryPostgres
  implements AuthenticationRepository
{
  readonly #db: DB;

  constructor(db: DB) {
    this.#db = db;
  }

  async addToken(token: string) {
    await this.#db.insertInto("authentications").values({ token }).execute();
  }

  async verifyTokenIsExists(token: string) {
    const result = await this.#db
      .selectFrom("authentications")
      .selectAll()
      .where("token", "=", token)
      .executeTakeFirst();

    if (result === undefined) {
      throw new Error(AUTHENTICATION_REPOSITORY_ERROR.REFRESH_TOKEN_NOT_FOUND);
    }
  }

  async deleteToken(token: string) {
    await this.#db
      .deleteFrom("authentications")
      .where("token", "=", token)
      .execute();
  }
}
