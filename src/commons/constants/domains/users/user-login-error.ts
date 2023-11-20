const prefix = "USER_LOGIN_ERROR";

export const USER_LOGIN_ERROR = {
  MISSING_PROPERTY: `${prefix}.MISSING_PROPERTY`,
  INVALID_DATA_TYPE: `${prefix}.INVALID_DATA_TYPE`,
};

export const USER_LOGIN_ERROR_MESSAGE = {
  MISSING_PROPERTY: "must send a username and password",
  INVALID_DATA_TYPE: "the username and password must be a type of string",
};
