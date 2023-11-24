import { nanoid } from "nanoid";

import { CommentsTableTestHelper } from "../../../tests/comments-table-test-helper";
import { RepliesTableTestHelper } from "../../../tests/replies-table-test-helper";
import { ThreadsTableTestHelper } from "../../../tests/threads-table-test-helper";
import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { REPLY_REPOSITORY_ERROR } from "../../commons/constants/domains/replies/reply-repository-error";
import { NewReply } from "../../domains/replies/entites/new-reply";
import { ReplyLocatorContext } from "../../domains/replies/entites/reply-locator-context";
import { ReplyOwnerContext } from "../../domains/replies/entites/reply-owner.context";
import { db } from "../database/postgres/db";
import { ReplyRepositoryPostgres } from "./reply-repository-postgres";

describe("ReplyRepository postgres", () => {
  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
  });

  describe("addReply method", () => {
    it("should be able to add a reply to the database", async () => {
      const fakeIdGenerator = () => "123";

      const replyRepository = new ReplyRepositoryPostgres(db, fakeIdGenerator);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({ id: owner, username: "bono" });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({ id: threadId, owner });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
      });

      const newReply = new NewReply({
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
      const replyRepository = new ReplyRepositoryPostgres(db, nanoid);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({ id: owner, username: "bono" });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({ id: threadId, owner });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
      });

      const newReply = new NewReply({
        content: "this is a content",
        owner,
        threadId,
        commentId,
      });

      const addedReply = await replyRepository.addReply(newReply);

      const replyOwnerContext = new ReplyOwnerContext({
        id: addedReply.id,
        owner,
      });

      await expect(
        replyRepository.verifyUserIsReplyOwner(replyOwnerContext)
      ).resolves.not.toThrow(Error);
    });

    it("should be able to verify if a user is not the reply owner", async () => {
      const replyRepository = new ReplyRepositoryPostgres(db, nanoid);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({ id: owner, username: "bono" });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({ id: threadId, owner });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
      });

      const newReply = new NewReply({
        content: "this is a content",
        owner,
        threadId,
        commentId,
      });

      const addedReply = await replyRepository.addReply(newReply);

      const replyOwnerContext = new ReplyOwnerContext({
        id: addedReply.id,
        owner: "user-456",
      });

      await expect(
        replyRepository.verifyUserIsReplyOwner(replyOwnerContext)
      ).rejects.toThrow(REPLY_REPOSITORY_ERROR.UNAUTHORIZED_REPLY_DELETION);
    });
  });

  describe("verifyReplyIsExists method", () => {
    it("should be able to verify if reply exists", async () => {
      const replyRepository = new ReplyRepositoryPostgres(db, nanoid);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({ id: owner, username: "bono" });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({ id: threadId, owner });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
      });

      const newReply = new NewReply({
        content: "this is a content",
        owner,
        threadId,
        commentId,
      });

      const addedReply = await replyRepository.addReply(newReply);

      const replyLocatorContext = new ReplyLocatorContext({
        id: addedReply.id,
        owner,
        commentId,
      });

      await expect(
        replyRepository.verifyReplyIsExists(replyLocatorContext)
      ).resolves.not.toThrow(Error);
    });

    it("should be able verify if reply does not exist", async () => {
      const replyRepository = new ReplyRepositoryPostgres(db, nanoid);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({ id: owner, username: "bono" });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({ id: threadId, owner });

      const commentId = "comment-123";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
      });

      const newReply = new NewReply({
        content: "this is a content",
        owner,
        threadId,
        commentId,
      });

      const addedReply = await replyRepository.addReply(newReply);

      // Comment Locator Context with non-existent id
      const replyLocatorContextA = new ReplyLocatorContext({
        id: "reply-456",
        commentId,
      });

      // Reply Locator Context with non-existent commentId
      const replyLocatorContextB = new ReplyLocatorContext({
        id: addedReply.id,
        commentId: "comment-456",
      });

      await expect(
        replyRepository.verifyReplyIsExists(replyLocatorContextA)
      ).rejects.toThrow(REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND);
      await expect(
        replyRepository.verifyReplyIsExists(replyLocatorContextB)
      ).rejects.toThrow(REPLY_REPOSITORY_ERROR.REPLY_NOT_FOUND);
    });
  });

  describe("softDeleteReplyById method", () => {
    it("should be able to soft delete reply by id", async () => {
      const replyRepository = new ReplyRepositoryPostgres(db, nanoid);

      const owner = "user-123";

      await UsersTableTestHelper.addUser({ id: owner, username: "bono" });

      const threadId = "thread-123";

      await ThreadsTableTestHelper.addThread({ id: threadId, owner });

      const commentId = "comment";

      await CommentsTableTestHelper.addComment({
        id: commentId,
        owner,
        threadId,
      });

      const replyId = "comment-123";

      await RepliesTableTestHelper.addReply({ id: replyId, owner, commentId });

      await replyRepository.softDeleteReplyById(replyId);

      const foundReply = await RepliesTableTestHelper.findReplyById(replyId);

      expect(foundReply?.isDeleted).toEqual(true);
    });
  });

  describe("getRepliesByCommentId method", () => {
    it("should return replies by comment id correctly", async () => {
      const replyRepository = new ReplyRepositoryPostgres(db, nanoid);

      const user = {
        id: "user-123",
        username: "bono",
      };

      await UsersTableTestHelper.addUser(user);

      const thread = {
        id: "thread-123",
        owner: user.id,
      };

      await ThreadsTableTestHelper.addThread(thread);

      const comment = {
        id: "comment-123",
        owner: user.id,
        threadId: thread.id,
      };

      await CommentsTableTestHelper.addComment(comment);

      const replyA = {
        id: "reply-123",
        owner: user.id,
        threadId: thread.id,
        commentId: comment.id,
      };

      await RepliesTableTestHelper.addReply(replyA);

      const replyB = {
        id: "reply-456",
        owner: user.id,
        threadId: thread.id,
        commentId: comment.id,
      };

      await RepliesTableTestHelper.addReply(replyB);

      const addedReplyA = await RepliesTableTestHelper.findReplyById(replyA.id);

      const addedReplyB = await RepliesTableTestHelper.findReplyById(replyB.id);

      const replies = await replyRepository.getRepliesByCommentId(comment.id);

      expect(replies).toStrictEqual([addedReplyA, addedReplyB]);
    });

    it("should return an empty array if there is no comment", async () => {
      const replyRepository = new ReplyRepositoryPostgres(db, nanoid);

      const user = {
        id: "user-123",
        username: "bono",
      };

      await UsersTableTestHelper.addUser(user);

      const thread = {
        id: "thread-123",
        owner: user.id,
      };

      await ThreadsTableTestHelper.addThread(thread);

      const comment = {
        id: "comment-123",
        owner: user.id,
        threadId: thread.id,
      };

      await CommentsTableTestHelper.addComment(comment);

      // Get comments from existent thread
      const repliesA = await replyRepository.getRepliesByCommentId(comment.id);

      // Get comments from non-existent thread
      const repliesB = await replyRepository.getRepliesByCommentId("reply-456");

      expect(repliesA).toStrictEqual([]);
      expect(repliesB).toStrictEqual([]);
    });

    it("should sort the replies by date (ascending)", async () => {
      const replyRepository = new ReplyRepositoryPostgres(db, nanoid);

      const user = {
        id: "user-123",
        username: "bono",
      };

      await UsersTableTestHelper.addUser(user);

      const thread = {
        id: "thread-123",
        owner: user.id,
      };

      await ThreadsTableTestHelper.addThread(thread);

      const comment = {
        id: "comment-123",
        owner: user.id,
        threadId: thread.id,
      };

      await CommentsTableTestHelper.addComment(comment);

      const replyA = {
        id: "reply-123",
        date: "2021-08-08T08:07:01.522Z",
        owner: user.id,
        threadId: thread.id,
        commentId: comment.id,
      };

      await RepliesTableTestHelper.addReply(replyA);

      const replyB = {
        id: "reply-456",
        date: "2021-08-08T07:59:48.766Z",
        owner: user.id,
        threadId: thread.id,
        commentId: comment.id,
      };

      await RepliesTableTestHelper.addReply(replyB);

      const addedReplyA = await RepliesTableTestHelper.findReplyById(replyA.id);

      const addedReplyB = await RepliesTableTestHelper.findReplyById(replyB.id);

      const replies = await replyRepository.getRepliesByCommentId(comment.id);

      expect(replies).toEqual([addedReplyB, addedReplyA]);
    });
  });
});
