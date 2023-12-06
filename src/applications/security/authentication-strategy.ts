export abstract class AuthenticationStrategy<
  TScheme extends string,
  TOptions extends object,
> {
  constructor(
    public readonly name: string,
    public readonly scheme: TScheme,
    public readonly options?: TOptions
  ) {
    if (this.constructor.name === "AuthenticationStrategy") {
      throw new Error("cannot instantiate abstract class");
    }
  }
}
