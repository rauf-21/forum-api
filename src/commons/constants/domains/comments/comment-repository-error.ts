const prefix = "COMMENT_REPOSITORY_ERROR";

export const COMMENT_REPOSITORY_ERROR = {
  METHOD_NOT_IMPLEMENTED: `${prefix}.METHOD_NOT_IMPLEMENTED`,
  UNAUTHORIZED_COMMENT_DELETION: `${prefix}.UNAUTHORIZED_COMMENT_DELETION`,
  COMMENT_NOT_FOUND: `${prefix}.COMMENT_NOT_FOUND`,
};

export const COMMENT_REPOSITORY_ERROR_MESSAGE = {
  UNAUTHORIZED_COMMENT_DELETION:
    "you do not have the necessary permissions to delete this comment",
  COMMENT_NOT_FOUND: "the comment is not found",
};
