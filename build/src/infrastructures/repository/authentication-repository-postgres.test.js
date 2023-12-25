"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentications_table_test_helper_1 = require("../../../tests/authentications-table-test-helper");
const authentication_repository_error_1 = require("../../commons/constants/domains/authentications/authentication-repository-error");
const db_1 = require("../database/postgres/db");
const authentication_repository_postgres_1 = require("./authentication-repository-postgres");
describe("AuthenticationRepository postgres", () => {
    beforeAll(async () => {
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
    });
    afterEach(async () => {
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    describe("addToken method", () => {
        it("should be able to add a token to the database", async () => {
            const authenticationRepository = new authentication_repository_postgres_1.AuthenticationRepositoryPostgres(db_1.db);
            const token = "token";
            await authenticationRepository.addToken(token);
            const foundToken = await authentications_table_test_helper_1.AuthenticationsTableTestHelper.findToken(token);
            expect(typeof foundToken).toEqual("string");
            expect(foundToken).toEqual(token);
        });
    });
    describe("verifyTokenIsExists method", () => {
        it("should be able to verify if a token exists", async () => {
            const authenticationRepository = new authentication_repository_postgres_1.AuthenticationRepositoryPostgres(db_1.db);
            const token = "token";
            await authentications_table_test_helper_1.AuthenticationsTableTestHelper.addToken(token);
            await expect(authenticationRepository.verifyTokenIsExists(token)).resolves.not.toThrow(Error);
        });
        it("should be able to verify if a token does not exist", async () => {
            const authenticationRepository = new authentication_repository_postgres_1.AuthenticationRepositoryPostgres(db_1.db);
            await expect(authenticationRepository.verifyTokenIsExists("token")).rejects.toThrow(authentication_repository_error_1.AUTHENTICATION_REPOSITORY_ERROR.REFRESH_TOKEN_NOT_FOUND);
        });
    });
    describe("deleteToken method", () => {
        it("should be able to delete a token from the database", async () => {
            const authenticationRepository = new authentication_repository_postgres_1.AuthenticationRepositoryPostgres(db_1.db);
            const token = "token";
            await authentications_table_test_helper_1.AuthenticationsTableTestHelper.addToken(token);
            await authenticationRepository.deleteToken(token);
            const foundToken = await authentications_table_test_helper_1.AuthenticationsTableTestHelper.findToken(token);
            expect(foundToken).toEqual(undefined);
        });
    });
});
