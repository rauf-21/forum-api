import { AuthenticationsHandler } from "./handler";

export const authenticationsRoutes = (handler: AuthenticationsHandler) => [
  {
    method: "POST",
    path: "/authentications",
    handler: handler.postAuhenticationHandler,
  },
  {
    method: "PUT",
    path: "/authentications",
    handler: handler.putAuthenticationHandler,
  },
  {
    method: "DELETE",
    path: "/authentications",
    handler: handler.deleteAuthenticationHandler,
  },
];
