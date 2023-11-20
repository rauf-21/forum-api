export abstract class ClientError extends Error {
  readonly name: string = "ClientError";

  constructor(
    message?: string,
    readonly statusCode = 400
  ) {
    super(message);

    if (this.constructor.name === "ClientError") {
      throw new Error("cannot instantiate abstract class");
    }
  }
}
