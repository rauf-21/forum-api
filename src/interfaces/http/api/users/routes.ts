import { UsersHandler } from "./handler";

export const usersRoutes = (handler: UsersHandler) => [
  {
    method: "POST",
    path: "/users",
    handler: handler.postUserHandler,
  },
];
