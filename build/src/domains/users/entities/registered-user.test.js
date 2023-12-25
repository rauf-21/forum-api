"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registered_user_error_1 = require("../../../commons/constants/domains/users/registered-user-error");
const registered_user_1 = require("./registered-user");
describe("RegisteredUser entities", () => {
    it("should be able to create the registeredUser object correctly", () => {
        const payload = {
            id: "user-123",
            username: "dicoding",
            fullname: "Dicoding Indonesia",
        };
        const registeredUser = new registered_user_1.RegisteredUser(payload);
        expect(registeredUser.id).toEqual(payload.id);
        expect(registeredUser.username).toEqual(payload.username);
        expect(registeredUser.fullname).toEqual(payload.fullname);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new registered_user_1.RegisteredUser(payload)).toThrow(registered_user_error_1.REGISTERED_USER_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            id: 123,
        };
        expect(() => new registered_user_1.RegisteredUser(payload)).toThrow(registered_user_error_1.REGISTERED_USER_ERROR.INVALID_DATA_TYPE);
    });
});
