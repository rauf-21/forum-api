import { ClientError } from "./client-error";

export class InvariantError extends ClientError {
  readonly name = "InvariantError";
}
