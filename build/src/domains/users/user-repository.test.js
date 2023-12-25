"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_error_1 = require("../../commons/constants/domains/users/user-repository-error");
const user_repository_1 = require("./user-repository");
describe("UserRepository", () => {
    it("should throw an error if an unimplemented method is called", async () => {
        // @ts-expect-error create an instance of an abstract class
        const userRepository = new user_repository_1.UserRepository();
        await expect(userRepository.addUser({})).rejects.toThrow(user_repository_error_1.USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(userRepository.verifyUsernameIsAvailable("")).rejects.toThrow(user_repository_error_1.USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(userRepository.getUserByUsername("")).rejects.toThrow(user_repository_error_1.USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(userRepository.getUsernameById("")).rejects.toThrow(user_repository_error_1.USER_REPOSITORY_ERROR.METHOD_NOT_IMPLEMENTED);
    });
});
