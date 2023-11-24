import { AuthenticationsTableTestHelper } from "../../../tests/authentications-table-test-helper";
import { AUTHENTICATION_REPOSITORY_ERROR } from "../../commons/constants/domains/authentications/authentication-repository-error";
import { db } from "../database/postgres/db";
import { AuthenticationRepositoryPostgres } from "./authentication-repository-postgres";

describe("AuthenticationRepository postgres", () => {
  beforeAll(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("addToken method", () => {
    it("should be able to add a token to the database", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(db);

      const token = "token";

      await authenticationRepository.addToken(token);

      const foundToken = await AuthenticationsTableTestHelper.findToken(token);

      expect(typeof foundToken).toEqual("string");
      expect(foundToken).toEqual(token);
    });
  });

  describe("verifyTokenIsExists method", () => {
    it("should be able to verify if a token exists", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(db);

      const token = "token";

      await AuthenticationsTableTestHelper.addToken(token);

      await expect(
        authenticationRepository.verifyTokenIsExists(token)
      ).resolves.not.toThrow(Error);
    });

    it("should be able to verify if a token does not exist", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(db);

      await expect(
        authenticationRepository.verifyTokenIsExists("token")
      ).rejects.toThrow(
        AUTHENTICATION_REPOSITORY_ERROR.REFRESH_TOKEN_NOT_FOUND
      );
    });
  });

  describe("deleteToken method", () => {
    it("should be able to delete a token from the database", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(db);

      const token = "token";

      await AuthenticationsTableTestHelper.addToken(token);
      await authenticationRepository.deleteToken(token);

      const foundToken = await AuthenticationsTableTestHelper.findToken(token);

      expect(foundToken).toEqual(undefined);
    });
  });
});
