"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const zod_1 = require("zod");
const user_login_error_1 = require("../../../commons/constants/domains/users/user-login-error");
const UserLoginPayloadSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: user_login_error_1.USER_LOGIN_ERROR.MISSING_PROPERTY,
        invalid_type_error: user_login_error_1.USER_LOGIN_ERROR.INVALID_DATA_TYPE,
    }),
    password: zod_1.z.string({
        required_error: user_login_error_1.USER_LOGIN_ERROR.MISSING_PROPERTY,
        invalid_type_error: user_login_error_1.USER_LOGIN_ERROR.INVALID_DATA_TYPE,
    }),
});
class UserLogin {
    constructor(payload) {
        const result = UserLoginPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { username, password } = result.data;
        this.username = username;
        this.password = password;
    }
}
exports.UserLogin = UserLogin;
