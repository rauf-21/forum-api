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

  describe("addToken function", () => {
    it("should be able to add a token to the database", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(db);

      const token = "token";

      await authenticationRepository.addToken(token);

      const foundToken = await AuthenticationsTableTestHelper.findToken(token);

      expect(foundToken).not.toBe(undefined);
      expect(foundToken).toBe(token);
    });
  });

  describe("checkAvailabilityToken function", () => {
    it("should not throw an error if a token is available", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(db);

      const token = "token";

      await AuthenticationsTableTestHelper.addToken(token);

      const result = await authenticationRepository.verifyTokenIsExists(token);

      expect(result).toEqual(undefined);
    });

    it("should throw an error if a token is not available", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(db);

      await expect(
        authenticationRepository.verifyTokenIsExists("token")
      ).rejects.toThrow(
        AUTHENTICATION_REPOSITORY_ERROR.REFRESH_TOKEN_NOT_FOUND
      );
    });
  });

  describe("deleteToken", () => {
    it("should be able to delete a token from the database", async () => {
      const authenticationRepository = new AuthenticationRepositoryPostgres(db);

      const token = "token";

      await AuthenticationsTableTestHelper.addToken(token);
      await authenticationRepository.deleteToken(token);

      const foundToken = await AuthenticationsTableTestHelper.findToken(token);

      expect(foundToken).toBe(undefined);
    });
  });
});
