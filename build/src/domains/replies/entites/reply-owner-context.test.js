"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reply_owner_context_error_1 = require("../../../commons/constants/domains/replies/reply-owner-context-error");
const reply_owner_context_1 = require("./reply-owner.context");
describe("ReplyOwnerContext entities", () => {
    it("should be able to create the replyOwnerContext object correctly", () => {
        const payload = {
            id: "reply-123",
            owner: "user-123",
        };
        const { id, owner } = new reply_owner_context_1.ReplyOwnerContext(payload);
        expect(id).toEqual(payload.id);
        expect(owner).toEqual(payload.owner);
    });
    it("should throw an error if there is a missing property", () => {
        const payload = {};
        expect(() => new reply_owner_context_1.ReplyOwnerContext(payload)).toThrow(reply_owner_context_error_1.REPLY_OWNER_CONTEXT_ERROR.MISSING_PROPERTY);
    });
    it("should throw an error if there is a property with invalid an data type", () => {
        const payload = {
            id: 123,
        };
        expect(() => new reply_owner_context_1.ReplyOwnerContext(payload)).toThrow(reply_owner_context_error_1.REPLY_OWNER_CONTEXT_ERROR.INVALID_DATA_TYPE);
    });
});
