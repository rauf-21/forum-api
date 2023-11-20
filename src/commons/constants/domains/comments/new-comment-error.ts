const prefix = "NEW_COMMENT_ERROR";

export const NEW_COMMENT_ERROR = {
  MISSING_PROPERTY: `${prefix}.MISSING_PROPERTY`,
  INVALID_DATA_TYPE: `${prefix}.INVALID_DATA_TYPE`,
};

export const NEW_COMMENT_ERROR_MESSAGE = {
  MISSING_PROPERTY: "must send a content",
  INVALID_DATA_TYPE: "the content must be a type of string",
};
