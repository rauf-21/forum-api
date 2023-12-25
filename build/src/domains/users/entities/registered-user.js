"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredUser = void 0;
const zod_1 = require("zod");
const registered_user_error_1 = require("../../../commons/constants/domains/users/registered-user-error");
const RegisteredUserPayloadSchema = zod_1.z.object({
    id: zod_1.z.string({
        required_error: registered_user_error_1.REGISTERED_USER_ERROR.MISSING_PROPERTY,
        invalid_type_error: registered_user_error_1.REGISTERED_USER_ERROR.INVALID_DATA_TYPE,
    }),
    username: zod_1.z.string({
        required_error: registered_user_error_1.REGISTERED_USER_ERROR.MISSING_PROPERTY,
        invalid_type_error: registered_user_error_1.REGISTERED_USER_ERROR.INVALID_DATA_TYPE,
    }),
    fullname: zod_1.z.string({
        required_error: registered_user_error_1.REGISTERED_USER_ERROR.MISSING_PROPERTY,
        invalid_type_error: registered_user_error_1.REGISTERED_USER_ERROR.INVALID_DATA_TYPE,
    }),
});
class RegisteredUser {
    constructor(payload) {
        const result = RegisteredUserPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { id, username, fullname } = result.data;
        this.id = id;
        this.username = username;
        this.fullname = fullname;
    }
}
exports.RegisteredUser = RegisteredUser;
