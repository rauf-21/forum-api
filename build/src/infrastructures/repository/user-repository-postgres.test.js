"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const user_repository_error_1 = require("../../commons/constants/domains/users/user-repository-error");
const register_user_1 = require("../../domains/users/entities/register-user");
const registered_user_1 = require("../../domains/users/entities/registered-user");
const db_1 = require("../database/postgres/db");
const user_repository_postgres_1 = require("./user-repository-postgres");
describe("UserRepositoryPostgres", () => {
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    describe("verifyUsernameIsAvailable method", () => {
        it("should be able to verify if the username is available", async () => {
            const userRepositoryPostgres = new user_repository_postgres_1.UserRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            await expect(userRepositoryPostgres.verifyUsernameIsAvailable("dicoding")).resolves.not.toThrow(Error);
        });
        it("should throw an error if the username is not available", async () => {
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: "user-123",
                username: "dicoding",
                password: "bono123",
                fullname: "bono bono",
            });
            const userRepositoryPostgres = new user_repository_postgres_1.UserRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            await expect(userRepositoryPostgres.verifyUsernameIsAvailable("dicoding")).rejects.toThrow(user_repository_error_1.USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND);
        });
    });
    describe("addUser method", () => {
        it("should be able to register user and return the registered user", async () => {
            const registerUser = new register_user_1.RegisterUser({
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const fakeIdGenerator = () => "123";
            const userRepositoryPostgres = new user_repository_postgres_1.UserRepositoryPostgres(db_1.db, fakeIdGenerator);
            await userRepositoryPostgres.addUser(registerUser);
            const user = await users_table_test_helper_1.UsersTableTestHelper.findUserById("user-123");
            expect(user).not.toEqual(undefined);
        });
        it("should return the registered user correctly", async () => {
            const registerUser = new register_user_1.RegisterUser({
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const fakeIdGenerator = () => "123";
            const userRepositoryPostgres = new user_repository_postgres_1.UserRepositoryPostgres(db_1.db, fakeIdGenerator);
            const registeredUser = await userRepositoryPostgres.addUser(registerUser);
            expect(registeredUser).toStrictEqual(new registered_user_1.RegisteredUser({
                id: "user-123",
                username: "bono",
                fullname: "bono bono",
            }));
        });
    });
    describe("getUserByUsername method", () => {
        it("should return the user if it is found", async () => {
            const userRepositoryPostgres = new user_repository_postgres_1.UserRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: "user-123",
                username: "dicoding",
                password: "secret_password",
                fullname: "bono bono",
            });
            const user = await userRepositoryPostgres.getUserByUsername("dicoding");
            expect(user).not.toEqual(undefined);
        });
        it("should throw an error if the user is not found", () => {
            const userRepositoryPostgres = new user_repository_postgres_1.UserRepositoryPostgres(db_1.db, () => "");
            return expect(userRepositoryPostgres.getUserByUsername("dicoding")).rejects.toThrow(user_repository_error_1.USER_REPOSITORY_ERROR.USERNAME_NOT_FOUND);
        });
    });
    describe("getUsernameById method", () => {
        it("should return the username correctly", async () => {
            const userRepository = new user_repository_postgres_1.UserRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const user = {
                id: "user-123",
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            await users_table_test_helper_1.UsersTableTestHelper.addUser(user);
            const username = await userRepository.getUsernameById(user.id);
            expect(username).toEqual(user.username);
        });
        it("should throw an error when the user is not found", async () => {
            const userRepository = new user_repository_postgres_1.UserRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            await expect(userRepository.getUsernameById("user-123")).rejects.toThrow(user_repository_error_1.USER_REPOSITORY_ERROR.USER_NOT_FOUND);
        });
    });
});
