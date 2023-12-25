"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const comments_table_test_helper_1 = require("../../../tests/comments-table-test-helper");
const replies_table_test_helper_1 = require("../../../tests/replies-table-test-helper");
const threads_table_test_helper_1 = require("../../../tests/threads-table-test-helper");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const reply_repository_error_1 = require("../../commons/constants/domains/replies/reply-repository-error");
const new_reply_1 = require("../../domains/replies/entites/new-reply");
const reply_locator_context_1 = require("../../domains/replies/entites/reply-locator-context");
const reply_owner_context_1 = require("../../domains/replies/entites/reply-owner.context");
const db_1 = require("../database/postgres/db");
const reply_repository_postgres_1 = require("./reply-repository-postgres");
describe("ReplyRepository postgres", () => {
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
        await comments_table_test_helper_1.CommentsTableTestHelper.cleanTable();
        await replies_table_test_helper_1.RepliesTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
        await comments_table_test_helper_1.CommentsTableTestHelper.cleanTable();
        await replies_table_test_helper_1.RepliesTableTestHelper.cleanTable();
    });
    describe("addReply method", () => {
        it("should be able to add a reply to the database", async () => {
            const fakeIdGenerator = () => "123";
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, fakeIdGenerator);
            const owner = "user-123";
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: owner,
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const threadId = "thread-123";
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread({
                id: threadId,
                owner,
                title: "this is a title",
                body: "this is a body",
            });
            const commentId = "comment-123";
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment({
                id: commentId,
                owner,
                threadId,
                content: "this is a comment",
            });
            const newReply = new new_reply_1.NewReply({
                content: "this is a content",
                owner,
                threadId,
                commentId,
            });
            const addedReply = await replyRepository.addReply(newReply);
            expect(addedReply.id).toEqual("reply-123");
            expect(addedReply.content).toEqual(newReply.content);
            expect(addedReply.owner).toEqual(newReply.owner);
        });
    });
    describe("verifyUserIsReplyOwner method", () => {
        it("should be able to verify if a user is the reply owner", async () => {
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const owner = "user-123";
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: owner,
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const threadId = "thread-123";
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread({
                id: threadId,
                owner,
                title: "this is a title",
                body: "this is a body",
            });
            const commentId = "comment-123";
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment({
                id: commentId,
                owner,
                threadId,
                content: "this is a comment",
            });
            const newReply = new new_reply_1.NewReply({
                content: "this is a content",
                owner,
                threadId,
                commentId,
            });
            const addedReply = await replyRepository.addReply(newReply);
            const replyOwnerContext = new reply_owner_context_1.ReplyOwnerContext({
                id: addedReply.id,
                owner,
            });
            await expect(replyRepository.verifyUserIsReplyOwner(replyOwnerContext)).resolves.not.toThrow(Error);
        });
        it("should be able to verify if a user is not the reply owner", async () => {
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const owner = "user-123";
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: owner,
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const threadId = "thread-123";
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread({
                id: threadId,
                owner,
                title: "this is a title",
                body: "this is a body",
            });
            const commentId = "comment-123";
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment({
                id: commentId,
                owner,
                threadId,
                content: "this is a comment",
            });
            const newReply = new new_reply_1.NewReply({
                content: "this is a content",
                owner,
                threadId,
                commentId,
            });
            const addedReply = await replyRepository.addReply(newReply);
            const replyOwnerContext = new reply_owner_context_1.ReplyOwnerContext({
                id: addedReply.id,
                owner: "user-456",
            });
            await expect(replyRepository.verifyUserIsReplyOwner(replyOwnerContext)).rejects.toThrow(reply_repository_error_1.REPLY_REPOSITORY_ERROR.UNAUTHORIZED_REPLY_DELETION);
        });
    });
    describe("verifyReplyIsExists method", () => {
        it("should be able to verify if reply exists", async () => {
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const owner = "user-123";
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: owner,
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const threadId = "thread-123";
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread({
                id: threadId,
                owner,
                title: "this is a title",
                body: "this is a body",
            });
            const commentId = "comment-123";
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment({
                id: commentId,
                owner,
                threadId,
                content: "this is a comment",
            });
            const newReply = new new_reply_1.NewReply({
                content: "this is a content",
                owner,
                threadId,
                commentId,
            });
            const addedReply = await replyRepository.addReply(newReply);
            const replyLocatorContext = new reply_locator_context_1.ReplyLocatorContext({
                id: addedReply.id,
                owner,
                commentId,
            });
            await expect(replyRepository.verifyReplyIsExists(replyLocatorContext)).resolves.not.toThrow(Error);
        });
        it("should be able verify if reply does not exist", async () => {
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const owner = "user-123";
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: owner,
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const threadId = "thread-123";
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread({
                id: threadId,
                owner,
                title: "this is a title",
                body: "this is a body",
            });
            const commentId = "comment-123";
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment({
                id: commentId,
                owner,
                threadId,
                content: "this is a comment",
            });
            const newReply = new new_reply_1.NewReply({
                content: "this is a content",
                owner,
                threadId,
                commentId,
            });
            const addedReply = await replyRepository.addReply(newReply);
            // Comment Locator Context with non-existent id
            const replyLocatorContextA = new reply_locator_context_1.ReplyLocatorContext({
                id: "reply-456",
                commentId,
            });
            // Reply Locator Context with non-existent commentId
            const replyLocatorContextB = new reply_locator_context_1.ReplyLocatorContext({
                id: addedReply.id,
                commentId: "comment-456",
            });
            await expect(replyRepository.verifyReplyIsExists(replyLocatorContextA)).rejects.toThrow(reply_repository_error_1.REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND);
            await expect(replyRepository.verifyReplyIsExists(replyLocatorContextB)).rejects.toThrow(reply_repository_error_1.REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND);
        });
    });
    describe("softDeleteReplyById method", () => {
        it("should be able to soft delete reply by id", async () => {
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const owner = "user-123";
            await users_table_test_helper_1.UsersTableTestHelper.addUser({
                id: owner,
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            });
            const threadId = "thread-123";
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread({
                id: threadId,
                owner,
                title: "this is a title",
                body: "this is a body",
            });
            const commentId = "comment";
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment({
                id: commentId,
                owner,
                threadId,
                content: "this is a comment",
            });
            const replyId = "comment-123";
            await replies_table_test_helper_1.RepliesTableTestHelper.addReply({
                id: replyId,
                owner,
                commentId,
                content: "this is a reply",
            });
            await replyRepository.softDeleteReplyById(replyId);
            const foundReply = await replies_table_test_helper_1.RepliesTableTestHelper.findReplyById(replyId);
            expect(foundReply === null || foundReply === void 0 ? void 0 : foundReply.isDeleted).toEqual(true);
        });
    });
    describe("getRepliesByCommentId method", () => {
        it("should return replies by comment id correctly", async () => {
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const user = {
                id: "user-123",
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            await users_table_test_helper_1.UsersTableTestHelper.addUser(user);
            const thread = {
                id: "thread-123",
                owner: user.id,
                title: "this is a title",
                body: "this is a body",
            };
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread(thread);
            const comment = {
                id: "comment-123",
                owner: user.id,
                threadId: thread.id,
                content: "this is a comment",
            };
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(comment);
            const replyA = {
                id: "reply-123",
                owner: user.id,
                commentId: comment.id,
                content: "this is a reply",
            };
            await replies_table_test_helper_1.RepliesTableTestHelper.addReply(replyA);
            const replyB = {
                id: "reply-456",
                owner: user.id,
                commentId: comment.id,
                content: "this is a reply",
            };
            await replies_table_test_helper_1.RepliesTableTestHelper.addReply(replyB);
            const addedReplyA = await replies_table_test_helper_1.RepliesTableTestHelper.findReplyById(replyA.id);
            const addedReplyB = await replies_table_test_helper_1.RepliesTableTestHelper.findReplyById(replyB.id);
            const replies = await replyRepository.getRepliesByCommentId(comment.id);
            expect(replies).toStrictEqual([addedReplyA, addedReplyB]);
        });
        it("should return an empty array if there is no comment", async () => {
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const user = {
                id: "user-123",
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            await users_table_test_helper_1.UsersTableTestHelper.addUser(user);
            const thread = {
                id: "thread-123",
                owner: user.id,
                title: "this is a title",
                body: "this is a body",
            };
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread(thread);
            const comment = {
                id: "comment-123",
                owner: user.id,
                threadId: thread.id,
                content: "this is a comment",
            };
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(comment);
            // Get comments from existent thread
            const repliesA = await replyRepository.getRepliesByCommentId(comment.id);
            // Get comments from non-existent thread
            const repliesB = await replyRepository.getRepliesByCommentId("reply-456");
            expect(repliesA).toStrictEqual([]);
            expect(repliesB).toStrictEqual([]);
        });
        it("should sort the replies by date (ascending)", async () => {
            const replyRepository = new reply_repository_postgres_1.ReplyRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const user = {
                id: "user-123",
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            await users_table_test_helper_1.UsersTableTestHelper.addUser(user);
            const thread = {
                id: "thread-123",
                owner: user.id,
                title: "this is a title",
                body: "this is a body",
            };
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread(thread);
            const comment = {
                id: "comment-123",
                owner: user.id,
                threadId: thread.id,
                content: "this is a comment",
            };
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(comment);
            const replyA = {
                id: "reply-123",
                date: "2021-08-08T08:07:01.522Z",
                owner: user.id,
                commentId: comment.id,
                content: "this is a reply",
            };
            await replies_table_test_helper_1.RepliesTableTestHelper.addReply(replyA);
            const replyB = {
                id: "reply-456",
                date: "2021-08-08T07:59:48.766Z",
                owner: user.id,
                commentId: comment.id,
                content: "this is a reply",
            };
            await replies_table_test_helper_1.RepliesTableTestHelper.addReply(replyB);
            const addedReplyA = await replies_table_test_helper_1.RepliesTableTestHelper.findReplyById(replyA.id);
            const addedReplyB = await replies_table_test_helper_1.RepliesTableTestHelper.findReplyById(replyB.id);
            const replies = await replyRepository.getRepliesByCommentId(comment.id);
            expect(replies).toEqual([addedReplyB, addedReplyA]);
        });
    });
});
