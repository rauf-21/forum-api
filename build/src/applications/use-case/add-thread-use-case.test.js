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
const added_thread_1 = require("../../domains/threads/entities/added-thread");
const new_thread_1 = require("../../domains/threads/entities/new-thread");
const add_thread_use_case_1 = require("./add-thread-use-case");
describe("AddThreadUseCase", () => {
    it("should orchestrate the add thread action correctly", async () => {
        const useCasePayload = {
            title: "this is a title",
            body: "this is a body",
            owner: "user-123",
        };
        const mockThreadRepository = jme.mock();
        mockThreadRepository.addThread.mockResolvedValue(new added_thread_1.AddedThread({
            id: "thread-123",
            title: useCasePayload.title,
            owner: useCasePayload.owner,
        }));
        const addThreadUseCase = new add_thread_use_case_1.AddThreadUseCase({
            threadRepository: mockThreadRepository,
        });
        const addedThread = await addThreadUseCase.execute(useCasePayload);
        expect(addedThread).toStrictEqual(new added_thread_1.AddedThread({
            id: "thread-123",
            title: useCasePayload.title,
            owner: useCasePayload.owner,
        }));
        expect(mockThreadRepository.addThread).toHaveBeenCalledWith(new new_thread_1.NewThread(useCasePayload));
    });
});
