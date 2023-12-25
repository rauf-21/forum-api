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
var _LoginUserUseCase_userRepository, _LoginUserUseCase_authenticationRepository, _LoginUserUseCase_authenticationTokenManager, _LoginUserUseCase_passwordHash;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserUseCase = void 0;
const new_authentication_1 = require("../../domains/authentications/entities/new-authentication");
const user_login_1 = require("../../domains/users/entities/user-login");
class LoginUserUseCase {
    constructor(dependencies) {
        _LoginUserUseCase_userRepository.set(this, void 0);
        _LoginUserUseCase_authenticationRepository.set(this, void 0);
        _LoginUserUseCase_authenticationTokenManager.set(this, void 0);
        _LoginUserUseCase_passwordHash.set(this, void 0);
        const { userRepository, authenticationRepository, authenticationTokenManager, passwordHash, } = dependencies;
        __classPrivateFieldSet(this, _LoginUserUseCase_userRepository, userRepository, "f");
        __classPrivateFieldSet(this, _LoginUserUseCase_authenticationRepository, authenticationRepository, "f");
        __classPrivateFieldSet(this, _LoginUserUseCase_authenticationTokenManager, authenticationTokenManager, "f");
        __classPrivateFieldSet(this, _LoginUserUseCase_passwordHash, passwordHash, "f");
    }
    async execute(payload) {
        const { username, password } = new user_login_1.UserLogin(payload);
        const { id, password: hashedPassword } = await __classPrivateFieldGet(this, _LoginUserUseCase_userRepository, "f").getUserByUsername(username);
        await __classPrivateFieldGet(this, _LoginUserUseCase_passwordHash, "f").verifyPassword(password, hashedPassword);
        const accessToken = await __classPrivateFieldGet(this, _LoginUserUseCase_authenticationTokenManager, "f").createAccessToken({
            id,
            username,
        });
        const refreshToken = await __classPrivateFieldGet(this, _LoginUserUseCase_authenticationTokenManager, "f").createRefreshToken({
            id,
            username,
        });
        const newAuthentication = new new_authentication_1.NewAuthentication({
            accessToken,
            refreshToken,
        });
        await __classPrivateFieldGet(this, _LoginUserUseCase_authenticationRepository, "f").addToken(newAuthentication.refreshToken);
        return newAuthentication;
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
_LoginUserUseCase_userRepository = new WeakMap(), _LoginUserUseCase_authenticationRepository = new WeakMap(), _LoginUserUseCase_authenticationTokenManager = new WeakMap(), _LoginUserUseCase_passwordHash = new WeakMap();
