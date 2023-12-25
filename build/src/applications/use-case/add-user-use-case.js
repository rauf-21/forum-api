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
var _AddUserUseCase_userRepository, _AddUserUseCase_passwordHash;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserUseCase = void 0;
const register_user_1 = require("../../domains/users/entities/register-user");
class AddUserUseCase {
    constructor(dependencies) {
        _AddUserUseCase_userRepository.set(this, void 0);
        _AddUserUseCase_passwordHash.set(this, void 0);
        const { userRepository, passwordHash } = dependencies;
        __classPrivateFieldSet(this, _AddUserUseCase_userRepository, userRepository, "f");
        __classPrivateFieldSet(this, _AddUserUseCase_passwordHash, passwordHash, "f");
    }
    async execute(useCasePayload) {
        const registerUser = new register_user_1.RegisterUser(useCasePayload);
        await __classPrivateFieldGet(this, _AddUserUseCase_userRepository, "f").verifyUsernameIsAvailable(registerUser.username);
        const hashedPassword = await __classPrivateFieldGet(this, _AddUserUseCase_passwordHash, "f").hash(registerUser.password);
        const registeredUser = await __classPrivateFieldGet(this, _AddUserUseCase_userRepository, "f").addUser(Object.assign(Object.assign({}, registerUser), { password: hashedPassword }));
        return registeredUser;
    }
}
exports.AddUserUseCase = AddUserUseCase;
_AddUserUseCase_userRepository = new WeakMap(), _AddUserUseCase_passwordHash = new WeakMap();
