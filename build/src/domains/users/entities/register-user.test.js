"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_user_error_1 = require("../../../commons/constants/domains/users/register-user-error");
const register_user_1 = require("./register-user");
describe("RegisterUser entities", () => {
    it("should be able to create the registerUser object correctly", () => {
        const payload = {
            username: "dicoding",
            fullname: "Dicoding Indonesia",
            password: "abc",
        };
        const { username, fullname, password } = new register_user_1.RegisterUser(payload);
        expect(username).toEqual(payload.username);
        expect(fullname).toEqual(payload.fullname);
        expect(password).toEqual(payload.password);
    });
    it("should throw an error if there is missing property", () => {
        const payload = {};
        expect(() => new register_user_1.RegisterUser(payload)).toThrow(register_user_error_1.REGISTER_USER_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            username: 123,
            fullname: true,
            password: "abc",
        };
        expect(() => new register_user_1.RegisterUser(payload)).toThrow(register_user_error_1.REGISTER_USER_ERROR.INVALID_DATA_TYPE);
    });
    it("should throw an error if the username contains more than 50 characters", () => {
        const payload = {
            username: "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
            fullname: "Dicoding Indonesia",
            password: "abc",
        };
        expect(() => new register_user_1.RegisterUser(payload)).toThrow(register_user_error_1.REGISTER_USER_ERROR.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT);
    });
    it("should throw an error if the username contains a restricted character", () => {
        const payload = {
            username: "dico ding",
            fullname: "dicoding",
            password: "abc",
        };
        expect(() => new register_user_1.RegisterUser(payload)).toThrow(register_user_error_1.REGISTER_USER_ERROR.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER);
    });
});
