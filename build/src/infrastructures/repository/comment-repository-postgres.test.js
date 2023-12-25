"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const comments_table_test_helper_1 = require("../../../tests/comments-table-test-helper");
const threads_table_test_helper_1 = require("../../../tests/threads-table-test-helper");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const comment_repository_error_1 = require("../../commons/constants/domains/comments/comment-repository-error");
const comment_locator_context_1 = require("../../domains/comments/entities/comment-locator-context");
const comment_owner_context_1 = require("../../domains/comments/entities/comment-owner-context");
const new_comment_1 = require("../../domains/comments/entities/new-comment");
const db_1 = require("../database/postgres/db");
const comment_repository_postgres_1 = require("./comment-repository-postgres");
describe("CommentRepository postgres", () => {
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
        await comments_table_test_helper_1.CommentsTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
        await comments_table_test_helper_1.CommentsTableTestHelper.cleanTable();
    });
    describe("addComment method", () => {
        it("should be able to add a comment to the database", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const newComment = new new_comment_1.NewComment({
                content: "this is a content",
                owner,
                threadId,
            });
            const addedComment = await commentRepository.addComment(newComment);
            expect(typeof addedComment.id).toEqual("string");
            expect(addedComment.content).toEqual(newComment.content);
            expect(addedComment.owner).toEqual(owner);
        });
    });
    describe("verifyUserIsCommentOwner method", () => {
        it("should be able to verify if a user is the comment owner", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const newComment = new new_comment_1.NewComment({
                content: "this is a content",
                owner,
                threadId,
            });
            const addedComment = await commentRepository.addComment(newComment);
            const commentOwnerContext = new comment_owner_context_1.CommentOwnerContext({
                id: addedComment.id,
                owner,
            });
            await expect(commentRepository.verifyUserIsCommentOwner(commentOwnerContext)).resolves.not.toThrow(Error);
        });
        it("should be able to verify if a user is not the comment owner", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const newComment = new new_comment_1.NewComment({
                content: "this is a content",
                owner,
                threadId,
            });
            const addedComment = await commentRepository.addComment(newComment);
            const commentOwnerContext = new comment_owner_context_1.CommentOwnerContext({
                id: addedComment.id,
                owner: "user-456",
            });
            await expect(commentRepository.verifyUserIsCommentOwner(commentOwnerContext)).rejects.toThrow(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.UNAUTHORIZED_COMMENT_DELETION);
        });
    });
    describe("verifyCommentIsExists method", () => {
        it("should be able to verify if a comment exists", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const newComment = new new_comment_1.NewComment({
                content: "this is a content",
                owner,
                threadId,
            });
            const addedComment = await commentRepository.addComment(newComment);
            const commentLocatorContext = new comment_locator_context_1.CommentLocatorContext({
                id: addedComment.id,
                threadId,
            });
            await expect(commentRepository.verifyCommentIsExists(commentLocatorContext)).resolves.not.toThrow(Error);
        });
        it("should be able to verify if a comment does not exist", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const newComment = new new_comment_1.NewComment({
                content: "this is a content",
                owner,
                threadId,
            });
            const addedComment = await commentRepository.addComment(newComment);
            // Comment Locator Context with non-existent threadId
            const commentLocatorContextA = new comment_locator_context_1.CommentLocatorContext({
                id: addedComment.id,
                threadId: "thread-456",
            });
            // Comment Locator Context with non-existent id and threadId
            const commentLocatorContextB = new comment_locator_context_1.CommentLocatorContext({
                id: "user-456",
                threadId: "thread-456",
            });
            await expect(commentRepository.verifyCommentIsExists(commentLocatorContextA)).rejects.toThrow(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.COMMENT_NOT_FOUND);
            await expect(commentRepository.verifyCommentIsExists(commentLocatorContextB)).rejects.toThrow(comment_repository_error_1.COMMENT_REPOSITORY_ERROR.COMMENT_NOT_FOUND);
        });
    });
    describe("softDeleteCommentById method", () => {
        it("should be able to soft delete comment by id", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            await commentRepository.softDeleteCommentById(commentId);
            const foundComment = await comments_table_test_helper_1.CommentsTableTestHelper.findCommentById(commentId);
            expect(foundComment === null || foundComment === void 0 ? void 0 : foundComment.isDeleted).toEqual(true);
        });
    });
    describe("getCommentsByThreadId method", () => {
        it("should return comments by thread id correctly", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const commentA = {
                id: "comment-123",
                owner: user.id,
                threadId: thread.id,
                content: "this is a comment",
            };
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(commentA);
            const commentB = {
                id: "comment-456",
                owner: user.id,
                threadId: thread.id,
                content: "this is a comment",
            };
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(commentB);
            const addedCommentA = await comments_table_test_helper_1.CommentsTableTestHelper.findCommentById(commentA.id);
            const addedCommentB = await comments_table_test_helper_1.CommentsTableTestHelper.findCommentById(commentB.id);
            const comments = await commentRepository.getCommentsByThreadId(thread.id);
            expect(comments).toStrictEqual([addedCommentA, addedCommentB]);
        });
        it("should return an empty array if there is no comment", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            // Get comments from existing thread
            const commentsA = await commentRepository.getCommentsByThreadId(thread.id);
            // Get comments from non-existent thread
            const commentsB = await commentRepository.getCommentsByThreadId("thread-456");
            expect(commentsA).toStrictEqual([]);
            expect(commentsB).toStrictEqual([]);
        });
        it("should sort the comments by date (ascending)", async () => {
            const commentRepository = new comment_repository_postgres_1.CommentRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const commentA = {
                id: "comment-123",
                date: "2021-08-08T08:07:01.522Z",
                owner: user.id,
                threadId: thread.id,
                content: "this is a comment",
            };
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(commentA);
            const commentB = {
                id: "comment-456",
                date: "2021-08-08T07:59:48.766Z",
                owner: user.id,
                threadId: thread.id,
                content: "this is a comment",
            };
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(commentB);
            const addedCommentA = await comments_table_test_helper_1.CommentsTableTestHelper.findCommentById(commentA.id);
            const addedCommentB = await comments_table_test_helper_1.CommentsTableTestHelper.findCommentById(commentB.id);
            const comments = await commentRepository.getCommentsByThreadId(thread.id);
            expect(comments).toEqual([addedCommentB, addedCommentA]);
        });
    });
});
