export interface AuthenticationRepository {
  addToken(token: string): Promise<void>;
  verifyTokenIsExists(token: string): Promise<void>;
  deleteToken(token: string): Promise<void>;
}
