"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DeleteAuthenticationUseCase_authenticationRepository;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAuthenticationUseCase = void 0;
const zod_1 = require("zod");
const delete_authentication_use_case_error_1 = require("../../commons/constants/applications/use-case/delete-authentication-use-case-error");
const DeleteAuthenticationUseCasePayloadSchema = zod_1.z.object({
    refreshToken: zod_1.z.string({
        required_error: delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR.MISSING_REFRESH_TOKEN,
        invalid_type_error: delete_authentication_use_case_error_1.DELETE_AUTHENTICATION_USE_CASE_ERROR.INVALID_REFRESH_TOKEN_DATA_TYPE,
    }),
});
class DeleteAuthenticationUseCase {
    constructor(dependencies) {
        _DeleteAuthenticationUseCase_authenticationRepository.set(this, void 0);
        const { authenticationRepository } = dependencies;
        __classPrivateFieldSet(this, _DeleteAuthenticationUseCase_authenticationRepository, authenticationRepository, "f");
    }
    async execute(payload) {
        const result = DeleteAuthenticationUseCasePayloadSchema.safeParse(payload);
        if (!result.success) {
            const errorMessage = result.error.issues[0].message;
            throw new Error(errorMessage);
        }
        const { refreshToken } = result.data;
        await __classPrivateFieldGet(this, _DeleteAuthenticationUseCase_authenticationRepository, "f").verifyTokenIsExists(refreshToken);
        await __classPrivateFieldGet(this, _DeleteAuthenticationUseCase_authenticationRepository, "f").deleteToken(refreshToken);
    }
}
exports.DeleteAuthenticationUseCase = DeleteAuthenticationUseCase;
_DeleteAuthenticationUseCase_authenticationRepository = new WeakMap();
