const prefix = "NEW_REPLY_ERROR";

export const NEW_REPLY_ERROR = {
  MISSING_PROPERTY: `${prefix}.MISSING_PROPERTY`,
  INVALID_DATA_TYPE: `${prefix}.INVALID_DATA_TYPE`,
};

export const NEW_REPLY_ERROR_MESSAGE = {
  MISSING_PROPERTY: "must send a content",
  INVALID_DATA_TYPE: "the content must be a type of string",
};
