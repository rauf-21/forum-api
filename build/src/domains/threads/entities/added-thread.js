"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedThread = void 0;
const zod_1 = require("zod");
const added_thread_error_1 = require("../../../commons/constants/domains/threads/added-thread-error");
const AddedThreadPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: added_thread_error_1.ADDED_THREAD_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_thread_error_1.ADDED_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
    title: zod_1.z.string({
        required_error: added_thread_error_1.ADDED_THREAD_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_thread_error_1.ADDED_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: added_thread_error_1.ADDED_THREAD_ERROR.MISSING_PROPERTY,
        invalid_type_error: added_thread_error_1.ADDED_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
});
class AddedThread {
    constructor(payload) {
        const result = AddedThreadPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { id, title, owner } = result.data;
        this.id = id;
        this.title = title;
        this.owner = owner;
    }
}
exports.AddedThread = AddedThread;
