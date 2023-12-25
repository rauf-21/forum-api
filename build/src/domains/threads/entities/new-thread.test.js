"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const new_thread_error_1 = require("../../../commons/constants/domains/threads/new-thread-error");
const new_thread_1 = require("./new-thread");
describe("NewThread entities", () => {
    it("should be able to create the newThread object correctly", () => {
        const payload = {
            title: "this is a title",
            body: "this is a body",
            owner: "user-123",
        };
        const { title, body, owner } = new new_thread_1.NewThread(payload);
        expect(title).toEqual(payload.title);
        expect(body).toEqual(payload.body);
        expect(owner).toEqual(payload.owner);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new new_thread_1.NewThread(payload)).toThrow(new_thread_error_1.NEW_THREAD_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            title: 123,
        };
        expect(() => new new_thread_1.NewThread(payload)).toThrow(new_thread_error_1.NEW_THREAD_ERROR.INVALID_DATA_TYPE);
    });
});
