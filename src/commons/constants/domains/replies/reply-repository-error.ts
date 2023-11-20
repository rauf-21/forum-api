const prefix = "REPLY_REPOSITORY_ERROR";

export const REPLY_REPOSITORY_ERROR = {
  UNAUTHORIZED_REPLY_DELETION: `${prefix}.UNAUTHORIZED_REPLY_DELETION`,
  REPLY_NOT_FOUND: `${prefix}.REPLY_NOT_FOUND`,
};

export const REPLY_REPOSITORY_ERROR_MESSAGE = {
  UNAUTHORIZED_REPLY_DELETION:
    "you do not have the necessary permissions to delete this reply",
  REPLY_NOT_FOUND: "the reply is not found",
};
