"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const new_comment_error_1 = require("../../../commons/constants/domains/comments/new-comment-error");
const new_comment_1 = require("./new-comment");
describe("NewComment entities", () => {
    it("should be able to create the newComment object correctly", () => {
        const payload = {
            content: "this is a content",
            owner: "user-123",
            threadId: "thread-123",
        };
        const { content, owner, threadId } = new new_comment_1.NewComment(payload);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
        expect(threadId).toEqual(payload.threadId);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new new_comment_1.NewComment(payload)).toThrow(new_comment_error_1.NEW_COMMENT_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            content: 123,
            owner: 123,
            threadId: 123,
        };
        expect(() => new new_comment_1.NewComment(payload)).toThrow(new_comment_error_1.NEW_COMMENT_ERROR.INVALID_DATA_TYPE);
    });
});
