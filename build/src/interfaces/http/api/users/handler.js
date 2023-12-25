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
var _UsersHandler_addUserUseCase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersHandler = void 0;
class UsersHandler {
    constructor(dependencies) {
        _UsersHandler_addUserUseCase.set(this, void 0);
        const { addUserUseCase } = dependencies;
        __classPrivateFieldSet(this, _UsersHandler_addUserUseCase, addUserUseCase, "f");
        this.postUserHandler = this.postUserHandler.bind(this);
    }
    async postUserHandler(request, h) {
        const addedUser = await __classPrivateFieldGet(this, _UsersHandler_addUserUseCase, "f").execute(request.payload);
        return h
            .response({
            status: "success",
            data: {
                addedUser,
            },
        })
            .code(201);
    }
}
exports.UsersHandler = UsersHandler;
_UsersHandler_addUserUseCase = new WeakMap();
