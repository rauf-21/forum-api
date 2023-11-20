import { ClientError } from "./client-error";

export class AuthorizationError extends ClientError {
  readonly name = "AuthorizationError";

  constructor(message?: string) {
    super(message, 403);
  }
}
