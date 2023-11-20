import { ClientError } from "./client-error";

export class NotFoundError extends ClientError {
  readonly name = "NotFoundError";

  constructor(message?: string) {
    super(message, 404);
  }
}
