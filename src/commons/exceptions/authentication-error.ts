import { ClientError } from "./client-error";

export class AuthenticationError extends ClientError {
  readonly name = "AuthenticationError";

  constructor(message?: string) {
    super(message, 401);
  }
}
