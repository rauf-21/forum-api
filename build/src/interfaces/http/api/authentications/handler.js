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
var _AuthenticationsHandler_loginUserUseCase, _AuthenticationsHandler_logoutUserUseCase, _AuthenticationsHandler_refreshAuthenticationUseCase;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationsHandler = void 0;
class AuthenticationsHandler {
    constructor(dependencies) {
        _AuthenticationsHandler_loginUserUseCase.set(this, void 0);
        _AuthenticationsHandler_logoutUserUseCase.set(this, void 0);
        _AuthenticationsHandler_refreshAuthenticationUseCase.set(this, void 0);
        const { loginUserUseCase, logoutUserUseCase, refreshAuthenticationUseCase, } = dependencies;
        __classPrivateFieldSet(this, _AuthenticationsHandler_loginUserUseCase, loginUserUseCase, "f");
        __classPrivateFieldSet(this, _AuthenticationsHandler_logoutUserUseCase, logoutUserUseCase, "f");
        __classPrivateFieldSet(this, _AuthenticationsHandler_refreshAuthenticationUseCase, refreshAuthenticationUseCase, "f");
        this.postAuhenticationHandler = this.postAuhenticationHandler.bind(this);
        this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
        this.deleteAuthenticationHandler =
            this.deleteAuthenticationHandler.bind(this);
    }
    async postAuhenticationHandler(request, h) {
        const { accessToken, refreshToken } = await __classPrivateFieldGet(this, _AuthenticationsHandler_loginUserUseCase, "f").execute(request.payload);
        return h
            .response({
            status: "success",
            data: { accessToken, refreshToken },
        })
            .code(201);
    }
    async putAuthenticationHandler(request, h) {
        const accessToken = await __classPrivateFieldGet(this, _AuthenticationsHandler_refreshAuthenticationUseCase, "f").execute(request.payload);
        return h.response({
            status: "success",
            data: {
                accessToken,
            },
        });
    }
    async deleteAuthenticationHandler(request) {
        await __classPrivateFieldGet(this, _AuthenticationsHandler_logoutUserUseCase, "f").execute(request.payload);
        return {
            status: "success",
        };
    }
}
exports.AuthenticationsHandler = AuthenticationsHandler;
_AuthenticationsHandler_loginUserUseCase = new WeakMap(), _AuthenticationsHandler_logoutUserUseCase = new WeakMap(), _AuthenticationsHandler_refreshAuthenticationUseCase = new WeakMap();
