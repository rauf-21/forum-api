const prefix = "AUTHENTICATION_REPOSITORY_ERROR";

export const AUTHENTICATION_REPOSITORY_ERROR = {
  METHOD_NOT_IMPLEMENTED: `${prefix}.METHOD_NOT_IMPLEMENTED`,
  REFRESH_TOKEN_NOT_FOUND: `${prefix}.REFRESH_TOKEN_NOT_FOUND`,
};

export const AUTHENTICATION_REPOSITORY_ERROR_MESSAGE = {
  REFRESH_TOKEN_NOT_FOUND: "refresh token tidak ditemukan di database",
};
