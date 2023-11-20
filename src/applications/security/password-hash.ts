export interface PasswordHash {
  hash(plainPassword: string): Promise<string>;
  verifyPassword(plainPassword: string, hashedPassword: string): Promise<void>;
}
