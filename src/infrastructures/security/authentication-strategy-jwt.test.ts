import { AuthenticationsTableTestHelper } from "../../../tests/authentications-table-test-helper";
import { UsersTableTestHelper } from "../../../tests/users-table-test-helper";
import { AUTHENTICATION_STRATEGY } from "../../commons/constants/applications/security/authentication-strategy";
import {
  ACCESS_TOKEN_AGE,
  ACCESS_TOKEN_SECRET,
} from "../../commons/constants/infrastructures/token";
import { container } from "../container";
import { db } from "../database/postgres/db";
import { createServer, CreateServerDependencies } from "../http/create-server";
import { AuthenticationStrategyJwt } from "./authentication-strategy-jwt";

describe("AuthenticationStrategyJwt", () => {
  beforeAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await db.destroy();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  it("should be able to create the authenticationStrategy object correctly", () => {
    const { name, scheme, options } = new AuthenticationStrategyJwt(
      AUTHENTICATION_STRATEGY.JWT
    );

    expect(name).toEqual(AUTHENTICATION_STRATEGY.JWT);
    expect(scheme).toEqual("jwt");
    expect(options).toBeDefined();
    expect(options.keys).toEqual(ACCESS_TOKEN_SECRET);
    expect(options.verify).toEqual({
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: ACCESS_TOKEN_AGE,
    });
    expect(options.validate).toBeDefined();
  });

  it("should be able to decode authorization header", async () => {
    const addUserUseCase = container.resolve("addUserUseCase");

    const payload = {
      username: "bono",
      password: "bono123",
      fullname: "bono bono",
    };

    const { id } = await addUserUseCase.execute(payload);

    const loginUserUseCase = container.resolve("loginUserUseCase");

    const { accessToken } = await loginUserUseCase.execute({
      username: payload.username,
      password: payload.password,
    });

    const server = await createServer(
      {} satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies
    );

    server.route([
      {
        method: "POST",
        path: "/authentication-strategy-jwt-test",
        handler(request) {
          return {
            id: request.auth.credentials.id,
          };
        },
        options: {
          auth: AUTHENTICATION_STRATEGY.JWT,
        },
      },
    ]);

    const response = await server.inject({
      method: "POST",
      url: "/authentication-strategy-jwt-test",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const responseJson = JSON.parse(response.payload);

    expect(responseJson.id).toEqual(id);
  });
});
