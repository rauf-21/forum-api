const prefix = "NEW_THREAD_ERROR";

export const NEW_THREAD_ERROR = {
  MISSING_PROPERTY: `${prefix}.MISSING_PROPERTIES`,
  INVALID_DATA_TYPE: `${prefix}.INVALID_DATA_TYPE`,
} as const;

export const NEW_THREAD_ERROR_MESSAGE = {
  MISSING_PROPERTY: "must send a title and body",
  INVALID_DATA_TYPE: "the title and body must be a type of string",
};
