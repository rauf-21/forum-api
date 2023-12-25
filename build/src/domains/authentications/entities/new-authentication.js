"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAuthentication = void 0;
const zod_1 = require("zod");
const new_authentication_error_1 = require("../../../commons/constants/domains/authentications/new-authentication-error");
const NewAuthenticationPayloadSchema = zod_1.z.object({
    accessToken: zod_1.z.string({
        required_error: new_authentication_error_1.NEW_AUTHENTICATION_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_authentication_error_1.NEW_AUTHENTICATION_ERROR.INVALID_DATA_TYPE,
    }),
    refreshToken: zod_1.z.string({
        required_error: new_authentication_error_1.NEW_AUTHENTICATION_ERROR.MISSING_PROPERTY,
        invalid_type_error: new_authentication_error_1.NEW_AUTHENTICATION_ERROR.INVALID_DATA_TYPE,
    }),
});
class NewAuthentication {
    constructor(payload) {
        const result = NewAuthenticationPayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { accessToken, refreshToken } = result.data;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
exports.NewAuthentication = NewAuthentication;
