import "dotenv-flow/config";

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const ACCESS_TOKEN_AGE = parseInt(
  process.env.ACCESS_TOKEN_AGE as string,
  10
);
