"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BcryptFunctions = __importStar(require("bcrypt"));
const password_hash_error_1 = require("../../commons/constants/applications/security/password-hash-error");
const password_hash_bcrypt_1 = require("./password-hash-bcrypt");
/**
 * This is a workaround around this issue https://github.com/jestjs/jest/issues/11019.
 * The solution is taken from this comment https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-893763840
 */
const Bcrypt = Object.assign({}, BcryptFunctions);
describe("PasswordHashBcrypt", () => {
    describe("hash method", () => {
        it("should be able to encrypt the password correctly", async () => {
            const spyHash = jest.spyOn(Bcrypt, "hash");
            const passwordHashBcrypt = new password_hash_bcrypt_1.PasswordHashBcrypt(Bcrypt);
            const hashedPassword = await passwordHashBcrypt.hash("plain_password");
            expect(typeof hashedPassword).toEqual("string");
            expect(hashedPassword).not.toEqual("plain_password");
            expect(spyHash).toHaveBeenCalledWith("plain_password", 10);
        });
    });
    describe("comparePassword method", () => {
        it("should be able to compare plain password and hashed password", async () => {
            const passwordHashBcrypt = new password_hash_bcrypt_1.PasswordHashBcrypt(Bcrypt);
            const plainPassword = "secret";
            const hashedPassword = await passwordHashBcrypt.hash(plainPassword);
            await expect(passwordHashBcrypt.verifyPassword(plainPassword, hashedPassword)).resolves.not.toThrow(Error);
        });
        it("should throw an error if the password does not match", async () => {
            const passwordHashBcrypt = new password_hash_bcrypt_1.PasswordHashBcrypt(Bcrypt);
            await expect(passwordHashBcrypt.verifyPassword("plain_password", "hashed_password")).rejects.toThrow(password_hash_error_1.PASSWORD_HASH_ERROR.INCORRECT_CREDENTIALS);
        });
    });
});
