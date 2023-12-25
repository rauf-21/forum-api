"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const comment_likes_table_test_helper_1 = require("../../../tests/comment-likes-table-test-helper");
const comments_table_test_helper_1 = require("../../../tests/comments-table-test-helper");
const threads_table_test_helper_1 = require("../../../tests/threads-table-test-helper");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const comment_owner_context_1 = require("../../domains/comments/entities/comment-owner-context");
const db_1 = require("../database/postgres/db");
const comment_like_repository_postgres_1 = require("./comment-like-repository-postgres");
describe("CommentLikeRepository postgres", () => {
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
        await comments_table_test_helper_1.CommentsTableTestHelper.cleanTable();
        await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await threads_table_test_helper_1.ThreadsTableTestHelper.cleanTable();
        await comments_table_test_helper_1.CommentsTableTestHelper.cleanTable();
        await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.cleanTable();
    });
    describe("isCommentLiked method", () => {
        it("should return true if the comment is liked", async () => {
            const commentLikeRepository = new comment_like_repository_postgres_1.CommentLikeRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.addCommentLike({
                id: "comment-like-123",
                commentId,
                owner,
            });
            const commentOwnerContext = new comment_owner_context_1.CommentOwnerContext({
                id: commentId,
                owner,
            });
            await expect(commentLikeRepository.isCommentLiked(commentOwnerContext)).resolves.toEqual(true);
        });
        it("should return false if the comment is not liked", async () => {
            const commentLikeRepository = new comment_like_repository_postgres_1.CommentLikeRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const commentOwnerContext = new comment_owner_context_1.CommentOwnerContext({
                id: commentId,
                owner,
            });
            await expect(commentLikeRepository.isCommentLiked(commentOwnerContext)).resolves.toEqual(false);
        });
    });
    describe("likeComment method", () => {
        it("should be able to like a comment", async () => {
            const idGenerator = () => "123";
            const commentLikeRepository = new comment_like_repository_postgres_1.CommentLikeRepositoryPostgres(db_1.db, idGenerator);
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
            const commentOwnerContext = new comment_owner_context_1.CommentOwnerContext({
                id: commentId,
                owner,
            });
            await commentLikeRepository.likeComment(commentOwnerContext);
            const commentLikeId = `comment-like-${idGenerator()}`;
            const foundLikeComment = await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.findCommentLikeById("comment-like-123");
            expect(foundLikeComment).toBeDefined();
            expect(foundLikeComment === null || foundLikeComment === void 0 ? void 0 : foundLikeComment.id).toEqual(commentLikeId);
            expect(foundLikeComment === null || foundLikeComment === void 0 ? void 0 : foundLikeComment.date).toBeInstanceOf(Date);
            expect(foundLikeComment === null || foundLikeComment === void 0 ? void 0 : foundLikeComment.commentId).toEqual(commentId);
            expect(foundLikeComment === null || foundLikeComment === void 0 ? void 0 : foundLikeComment.owner).toEqual(owner);
        });
    });
    describe("unlikeComment method", () => {
        it("should be able to unlike a comment", async () => {
            const commentLikeRepository = new comment_like_repository_postgres_1.CommentLikeRepositoryPostgres(db_1.db, nanoid_1.nanoid);
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
            const commentLikeId = "comment-like-123";
            await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.addCommentLike({
                id: commentLikeId,
                commentId,
                owner,
            });
            const commentOwnerContext = new comment_owner_context_1.CommentOwnerContext({
                id: commentId,
                owner,
            });
            await commentLikeRepository.unlikeComment(commentOwnerContext);
            const foundLikeComment = await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.findCommentLikeById(commentLikeId);
            expect(foundLikeComment).toEqual(undefined);
        });
    });
    describe("getCommentLikeCountByCommentId", () => {
        it("should return a number based on the comment likes count", async () => {
            const commentLikeRepository = new comment_like_repository_postgres_1.CommentLikeRepositoryPostgres(db_1.db, nanoid_1.nanoid);
            const userA = {
                id: "user-123",
                username: "bono",
                password: "bono123",
                fullname: "bono bono",
            };
            const userB = {
                id: "user-456",
                username: "kiyo",
                password: "kiyo123",
                fullname: "kiyo kiyo",
            };
            const userC = {
                id: "user-789",
                username: "mako",
                password: "mako123",
                fullname: "mako mako",
            };
            await users_table_test_helper_1.UsersTableTestHelper.addUser(userA);
            await users_table_test_helper_1.UsersTableTestHelper.addUser(userB);
            await users_table_test_helper_1.UsersTableTestHelper.addUser(userC);
            const threadId = "thread-123";
            await threads_table_test_helper_1.ThreadsTableTestHelper.addThread({
                id: threadId,
                owner: userA.id,
                title: "this is a title",
                body: "this is a body",
            });
            const commentA = {
                id: "comment-123",
                threadId,
                owner: userA.id,
                content: "this is comment a",
            };
            const commentB = {
                id: "comment-456",
                threadId,
                owner: userB.id,
                content: "this is comment b",
            };
            const commentC = {
                id: "comment-789",
                threadId,
                owner: userC.id,
                content: "this is comment c",
            };
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(commentA);
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(commentB);
            await comments_table_test_helper_1.CommentsTableTestHelper.addComment(commentC);
            await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.addCommentLike({
                id: "comment-like-123",
                commentId: commentB.id,
                owner: userA.id,
            });
            await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.addCommentLike({
                id: "comment-like-456",
                commentId: commentC.id,
                owner: userB.id,
            });
            await comment_likes_table_test_helper_1.CommentLikesTableTestHelper.addCommentLike({
                id: "comment-like-789",
                commentId: commentC.id,
                owner: userA.id,
            });
            const commentLikeCountA = await commentLikeRepository.getCommentLikeCountByCommentId(commentA.id);
            const commentLikeCountB = await commentLikeRepository.getCommentLikeCountByCommentId(commentB.id);
            const commentLikeCountC = await commentLikeRepository.getCommentLikeCountByCommentId(commentC.id);
            const commentLikeCountD = await commentLikeRepository.getCommentLikeCountByCommentId("comment-999");
            expect(commentLikeCountA).toEqual(0);
            expect(commentLikeCountB).toEqual(1);
            expect(commentLikeCountC).toEqual(2);
            expect(commentLikeCountD).toEqual(0);
        });
    });
});
