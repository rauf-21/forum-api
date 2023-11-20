export interface AuthenticationStrategy {
  name: string;
  scheme: string;
  options?: object;
}
