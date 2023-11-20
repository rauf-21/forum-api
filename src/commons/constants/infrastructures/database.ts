import DotenvExpand from "dotenv-expand";
import DotenvFlow from "dotenv-flow";

DotenvExpand.expand(DotenvFlow.config());

export const DATABASE_HOST = process.env.DATABASE_HOST as string;

export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT as string, 10);

export const DATABASE_USER = process.env.DATABASE_USER as string;

export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

export const DATABASE_NAME = process.env.DATABASE_NAME as string;

export const DATABASE_URL = process.env.DATABASE_URL as string;
