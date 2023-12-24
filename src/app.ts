/* istanbul ignore file */
import { container } from "./infrastructures/container";
import { createServer } from "./infrastructures/http/create-server";

async function start() {
  const addUserUseCase = container.resolve("addUserUseCase");

  const loginUserUseCase = container.resolve("loginUserUseCase");

  const logoutUserUseCase = container.resolve("logoutUserUseCase");

  const refreshAuthenticationUseCase = container.resolve(
    "refreshAuthenticationUseCase"
  );

  const addThreadUseCase = container.resolve("addThreadUseCase");

  const addCommentUseCase = container.resolve("addCommentUseCase");

  const softDeleteCommentUseCase = container.resolve(
    "softDeleteCommentUseCase"
  );

  const addReplyUseCase = container.resolve("addReplyUseCase");

  const softDeleteReplyUseCase = container.resolve("softDeleteReplyUseCase");

  const getThreadDetailUseCase = container.resolve("getThreadDetailUseCase");

  const server = await createServer({
    addUserUseCase,
    loginUserUseCase,
    logoutUserUseCase,
    refreshAuthenticationUseCase,
    addThreadUseCase,
    addCommentUseCase,
    softDeleteCommentUseCase,
    addReplyUseCase,
    softDeleteReplyUseCase,
    getThreadDetailUseCase,
  });

  await server.start();

  // eslint-disable-next-line no-console
  console.log(`Server start at ${server.info.uri}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
