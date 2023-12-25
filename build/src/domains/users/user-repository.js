"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_repository_error_1 = require("../../commons/constants/domains/users/user-repository-error");
class UserRepository {
    async addUser(registerUser) {
        throw new Error(user_repository_error_1.USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async verifyUsernameIsAvailable(username) {
        throw new Error(user_repository_error_1.USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async getUserByUsername(username) {
        throw new Error(user_repository_error_1.USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
    async getUsernameById(id) {
        throw new Error(user_repository_error_1.USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    }
}
exports.UserRepository = UserRepository;
