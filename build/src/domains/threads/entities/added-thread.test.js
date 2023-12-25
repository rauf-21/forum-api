"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const added_thread_error_1 = require("../../../commons/constants/domains/threads/added-thread-error");
const added_thread_1 = require("./added-thread");
describe("AddedThread entitites", () => {
    it("should be able to create the addedThread object correctly", () => {
        const payload = {
            id: "thread-123",
            title: "this is a thread",
            owner: "user-123",
        };
        const { id, title, owner } = new added_thread_1.AddedThread(payload);
        expect(id).toEqual(payload.id);
        expect(title).toEqual(payload.title);
        expect(owner).toEqual(payload.owner);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new added_thread_1.AddedThread(payload)).toThrow(added_thread_error_1.ADDED_THREAD_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            id: 123,
        };
        expect(() => new added_thread_1.AddedThread(payload)).toThrow(added_thread_error_1.ADDED_THREAD_ERROR.INVALID_DATA_TYPE);
    });
});
