import { HapiJwt } from "@hapi/jwt";

export interface AuthenticationTokenManager {
  createRefreshToken(payload: HapiJwt.Payload): Promise<string>;
  createAccessToken(payload: HapiJwt.Payload): Promise<string>;
  verifyRefreshToken(token: string): Promise<void>;
  decodePayload(token: string): Promise<HapiJwt.Payload>;
}
