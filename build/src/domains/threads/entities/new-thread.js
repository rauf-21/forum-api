"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewThread = void 0;
const zod_1 = require("zod");
const new_thread_error_1 = require("../../../commons/constants/domains/threads/new-thread-error");
const NewThreadPayloadSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: new_thread_error_1.NEW_THREAD_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_thread_error_1.NEW_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
    body: zod_1.z.string({
        required_error: new_thread_error_1.NEW_THREAD_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_thread_error_1.NEW_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
    owner: zod_1.z.string({
        required_error: new_thread_error_1.NEW_THREAD_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_thread_error_1.NEW_THREAD_ERROR.INVALID_DATA_TYPE,
    }),
}, {
    required_error: new_thread_error_1.NEW_THREAD_ERROR.MISSING_PROPERTY,
    invalid_type_error: new_thread_error_1.NEW_THREAD_ERROR.INVALID_DATA_TYPE,
});
class NewThread {
    constructor(payload) {
        const result = NewThreadPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { title, body, owner } = result.data;
        this.title = title;
        this.body = body;
        this.owner = owner;
    }
}
exports.NewThread = NewThread;
