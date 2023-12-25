"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_locator_context_error_1 = require("../../../commons/constants/domains/comments/comment-locator-context-error");
const comment_locator_context_1 = require("./comment-locator-context");
describe("CommentLocatorContext entities", () => {
    it("should be able to create the commentLocatorContext object correctly", () => {
        const payload = {
            id: "comment-123",
            threadId: "thread-123",
        };
        const { id, threadId } = new comment_locator_context_1.CommentLocatorContext(payload);
        expect(id).toEqual(payload.id);
        expect(threadId).toEqual(payload.threadId);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new comment_locator_context_1.CommentLocatorContext(payload)).toThrow(comment_locator_context_error_1.COMMENT_LOCATOR_CONTEXT_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            id: 123,
        };
        expect(() => new comment_locator_context_1.CommentLocatorContext(payload)).toThrow(comment_locator_context_error_1.COMMENT_LOCATOR_CONTEXT_ERROR.INVALID_DATA_TYPE);
    });
});
