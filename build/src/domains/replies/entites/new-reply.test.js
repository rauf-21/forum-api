"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const new_reply_error_1 = require("../../../commons/constants/domains/replies/new-reply-error");
const new_reply_1 = require("./new-reply");
describe("NewReply entities", () => {
    it("should be able to create the newReply object correctly", () => {
        const payload = {
            content: "this is a content",
            owner: "user-123",
            threadId: "thread-123",
            commentId: "comment-123",
        };
        const { content, owner, threadId, commentId } = new new_reply_1.NewReply(payload);
        expect(content).toEqual(payload.content);
        expect(owner).toEqual(payload.owner);
        expect(threadId).toEqual(payload.threadId);
        expect(commentId).toEqual(payload.commentId);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new new_reply_1.NewReply(payload)).toThrow(new_reply_error_1.NEW_REPLY_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with an invalid data type", () => {
        const payload = {
            content: 123,
        };
        expect(() => new new_reply_1.NewReply(payload)).toThrow(new_reply_error_1.NEW_REPLY_ERROR.INVALID_DATA_TYPE);
    });
});
