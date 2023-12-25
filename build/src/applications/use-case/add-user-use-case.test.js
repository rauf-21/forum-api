"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jme = __importStar(require("jest-mock-extended"));
const register_user_1 = require("../../domains/users/entities/register-user");
const registered_user_1 = require("../../domains/users/entities/registered-user");
const add_user_use_case_1 = require("./add-user-use-case");
describe("AddUserUseCase", () => {
    it("should orchestrate the add user action correctly", async () => {
        const useCasePayload = {
            username: "dicoding",
            password: "secret",
            fullname: "Dicoding Indonesia",
        };
        const mockUserRepository = jme.mock();
        mockUserRepository.verifyUsernameIsAvailable.mockResolvedValue(undefined);
        mockUserRepository.addUser.mockResolvedValue(new registered_user_1.RegisteredUser({
            id: "user-123",
            username: useCasePayload.username,
            fullname: useCasePayload.fullname,
        }));
        const mockPasswordHash = jme.mock();
        mockPasswordHash.hash.mockResolvedValue("hashed_password");
        const getUserUseCase = new add_user_use_case_1.AddUserUseCase({
            userRepository: mockUserRepository,
            passwordHash: mockPasswordHash,
        });
        const registeredUser = await getUserUseCase.execute(useCasePayload);
        expect(registeredUser).toStrictEqual(new registered_user_1.RegisteredUser({
            id: "user-123",
            username: useCasePayload.username,
            fullname: useCasePayload.fullname,
        }));
        expect(mockUserRepository.verifyUsernameIsAvailable).toHaveBeenCalledWith(useCasePayload.username);
        expect(mockPasswordHash.hash).toHaveBeenCalledWith(useCasePayload.password);
        expect(mockUserRepository.addUser).toHaveBeenCalledWith(new register_user_1.RegisterUser({
            username: useCasePayload.username,
            password: "hashed_password",
            fullname: useCasePayload.fullname,
        }));
    });
});
