"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const zod_1 = require("zod");
const register_user_error_1 = require("../../../commons/constants/domains/users/register-user-error");
const RegisterUserPayload = zod_1.z.object({
    username: zod_1.z
        .string({
        required_error: register_user_error_1.REGISTER_USER_ERROR.MISSING_PROPERTY,
        invalid_type_error: register_user_error_1.REGISTER_USER_ERROR.INVALID_DATA_TYPE,
    })
        .refine((username) => username.length <= 50, {
        message: register_user_error_1.REGISTER_USER_ERROR.USERNAME_EXCEEDS_THE_CHARACTER_LIMIT,
    })
        .refine((username) => username.match(/^[a-zA-Z0-9_]+$/), {
        message: register_user_error_1.REGISTER_USER_ERROR.USERNAME_CONTAINS_A_RESTRICTED_CHARACTER,
    }),
    password: zod_1.z.string({
        required_error: register_user_error_1.REGISTER_USER_ERROR.MISSING_PROPERTY,
        invalid_type_error: register_user_error_1.REGISTER_USER_ERROR.INVALID_DATA_TYPE,
    }),
    fullname: zod_1.z.string({
        required_error: register_user_error_1.REGISTER_USER_ERROR.MISSING_PROPERTY,
        invalid_type_error: register_user_error_1.REGISTER_USER_ERROR.INVALID_DATA_TYPE,
    }),
});
class RegisterUser {
    constructor(payload) {
        const result = RegisterUserPayload.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { username, password, fullname } = result.data;
        this.username = username;
        this.password = password;
        this.fullname = fullname;
    }
}
exports.RegisterUser = RegisterUser;
