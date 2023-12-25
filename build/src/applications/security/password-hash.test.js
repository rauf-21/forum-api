"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const password_hash_error_1 = require("../../commons/constants/applications/security/password-hash-error");
const password_hash_1 = require("./password-hash");
describe("PasswordHash", () => {
    it("should throw an error if an unimplemented method is called", async () => {
        // @ts-expect-error create an instance of an abstract class
        const passwordHash = new password_hash_1.PasswordHash();
        await expect(passwordHash.hash("plain")).rejects.toThrow(password_hash_error_1.PASSWORD_HASH_ERROR.METHOD_NOT_IMPLEMENTED);
        await expect(passwordHash.verifyPassword("plain", "hashed")).rejects.toThrow(password_hash_error_1.PASSWORD_HASH_ERROR.METHOD_NOT_IMPLEMENTED);
    });
});
