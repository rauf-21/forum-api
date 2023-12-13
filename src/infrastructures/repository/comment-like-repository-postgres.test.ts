import { nanoid } from "nanoid";

import { CommentLikesTableTestHelper } from "../../../tests/comment-likes-table-test-helper";
import { CommentsTableTestHelper } from "../../../tests/comments-table-test-helper";
import { ThreadsTableTestHelper } from "../../../tests/threads-table-test-helper";
import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { CommentOwnerContext } from "../../domains/comments/entities/comment-owner-context";
import { db } from "../database/postgres/db";
import { CommentLikeRepositoryPostgres } from "./comment-like-repository-postgres";

describe("CommentLikeRepository postgres", () => {
  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await CommentLikesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await CommentLikesTableTestHelper.cleanTable();
  });

  describe("isCommentLiked method", () => {
    it("should return true if the comment is liked", async () => {
      const commentLikeRepository = new CommentLikeRepositoryPostgres(
        db,
        nanoid
      );

      const owner = "user-123";

      await UsersTableTestHelper.addUser({
        id: owner,
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({
        id: threadId,
        owner,
        title: "this is a title",
        body: "this is a body",
      });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
        content: "this is a comment",
      });
      await CommentLikesTableTestHelper.addCommentLike({
        id: "comment-like-123",
        commentId,
        owner,
      });

      const commentOwnerContext = new CommentOwnerContext({
        id: commentId,
        owner,
      });

      await expect(
        commentLikeRepository.isCommentLiked(commentOwnerContext)
      ).resolves.toEqual(true);
    });

    it("should return false if the comment is not liked", async () => {
      const commentLikeRepository = new CommentLikeRepositoryPostgres(
        db,
        nanoid
      );

      const owner = "user-123";

      await UsersTableTestHelper.addUser({
        id: owner,
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({
        id: threadId,
        owner,
        title: "this is a title",
        body: "this is a body",
      });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
        content: "this is a comment",
      });

      const commentOwnerContext = new CommentOwnerContext({
        id: commentId,
        owner,
      });

      await expect(
        commentLikeRepository.isCommentLiked(commentOwnerContext)
      ).resolves.toEqual(false);
    });
  });

  describe("likeComment method", () => {
    it("should be able to like a comment", async () => {
      const idGenerator = () => "123";

      const commentLikeRepository = new CommentLikeRepositoryPostgres(
        db,
        idGenerator
      );

      const owner = "user-123";

      await UsersTableTestHelper.addUser({
        id: owner,
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({
        id: threadId,
        owner,
        title: "this is a title",
        body: "this is a body",
      });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
        content: "this is a comment",
      });

      const commentOwnerContext = new CommentOwnerContext({
        id: commentId,
        owner,
      });

      await commentLikeRepository.likeComment(commentOwnerContext);

      const commentLikeId = `comment-like-${idGenerator()}`;

      const foundLikeComment =
        await CommentLikesTableTestHelper.findCommentLikeById(
          "comment-like-123"
        );

      expect(foundLikeComment).toBeDefined();
      expect(foundLikeComment?.id).toEqual(commentLikeId);
      expect(foundLikeComment?.date).toBeInstanceOf(Date);
      expect(foundLikeComment?.commentId).toEqual(commentId);
      expect(foundLikeComment?.owner).toEqual(owner);
    });
  });

  describe("unlikeComment method", () => {
    it("should be able to unlike a comment", async () => {
      const commentLikeRepository = new CommentLikeRepositoryPostgres(
        db,
        nanoid
      );

      const owner = "user-123";

      await UsersTableTestHelper.addUser({
        id: owner,
        username: "bono",
        password: "bono123",
        fullname: "bono bono",
      });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({
        id: threadId,
        owner,
        title: "this is a title",
        body: "this is a body",
      });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
        content: "this is a comment",
      });

      const commentLikeId = "comment-like-123";

      await CommentLikesTableTestHelper.addCommentLike({
        id: commentLikeId,
        commentId,
        owner,
      });

      const commentOwnerContext = new CommentOwnerContext({
        id: commentId,
        owner,
      });

      await commentLikeRepository.unlikeComment(commentOwnerContext);

      const foundLikeComment =
        await CommentLikesTableTestHelper.findCommentLikeById(commentLikeId);

      expect(foundLikeComment).toEqual(undefined);
    });
  });

  describe("getCommentLikeCountByCommentId", () => {
    it("should return a number based on the comment likes count", async () => {
      const commentLikeRepository = new CommentLikeRepositoryPostgres(
        db,
        nanoid
      );

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

      await UsersTableTestHelper.addUser(userA);
      await UsersTableTestHelper.addUser(userB);
      await UsersTableTestHelper.addUser(userC);

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({
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

      await CommentsTableTestHelper.addComment(commentA);
      await CommentsTableTestHelper.addComment(commentB);
      await CommentsTableTestHelper.addComment(commentC);
      await CommentLikesTableTestHelper.addCommentLike({
        id: "comment-like-123",
        commentId: commentB.id,
        owner: userA.id,
      });
      await CommentLikesTableTestHelper.addCommentLike({
        id: "comment-like-456",
        commentId: commentC.id,
        owner: userB.id,
      });
      await CommentLikesTableTestHelper.addCommentLike({
        id: "comment-like-789",
        commentId: commentC.id,
        owner: userA.id,
      });

      const commentLikeCountA =
        await commentLikeRepository.getCommentLikeCountByCommentId(commentA.id);

      const commentLikeCountB =
        await commentLikeRepository.getCommentLikeCountByCommentId(commentB.id);

      const commentLikeCountC =
        await commentLikeRepository.getCommentLikeCountByCommentId(commentC.id);

      const commentLikeCountD =
        await commentLikeRepository.getCommentLikeCountByCommentId(
          "comment-999"
        );

      expect(commentLikeCountA).toEqual(0);
      expect(commentLikeCountB).toEqual(1);
      expect(commentLikeCountC).toEqual(2);
      expect(commentLikeCountD).toEqual(0);
    });
  });
});
