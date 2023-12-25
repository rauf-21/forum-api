"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentications_table_test_helper_1 = require("../../../tests/authentications-table-test-helper");
const users_table_test_helper_1 = require("../../../tests/users-table-test-helper");
const authentication_strategy_1 = require("../../commons/constants/applications/security/authentication-strategy");
const token_1 = require("../../commons/constants/infrastructures/token");
const container_1 = require("../container");
const db_1 = require("../database/postgres/db");
const create_server_1 = require("../http/create-server");
const authentication_strategy_jwt_1 = require("./authentication-strategy-jwt");
describe("AuthenticationStrategyJwt", () => {
    beforeAll(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
    });
    afterAll(async () => {
        await db_1.db.destroy();
    });
    afterEach(async () => {
        await users_table_test_helper_1.UsersTableTestHelper.cleanTable();
        await authentications_table_test_helper_1.AuthenticationsTableTestHelper.cleanTable();
    });
    it("should be able to create the authenticationStrategy object correctly", () => {
        const { name, scheme, options } = new authentication_strategy_jwt_1.AuthenticationStrategyJwt(authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT);
        expect(name).toEqual(authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT);
        expect(scheme).toEqual("jwt");
        expect(typeof options).toEqual("object");
        expect(options === null || options === void 0 ? void 0 : options.keys).toEqual(token_1.ACCESS_TOKEN_SECRET);
        expect(options === null || options === void 0 ? void 0 : options.verify).toEqual({
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: token_1.ACCESS_TOKEN_AGE,
        });
        expect(options === null || options === void 0 ? void 0 : options.validate).toBeDefined();
    });
    it("should be able to decode authorization header", async () => {
        const addUserUseCase = container_1.container.resolve("addUserUseCase");
        const payload = {
            username: "bono",
            password: "bono123",
            fullname: "bono bono",
        };
        const { id } = await addUserUseCase.execute(payload);
        const loginUserUseCase = container_1.container.resolve("loginUserUseCase");
        const { accessToken } = await loginUserUseCase.execute({
            username: payload.username,
            password: payload.password,
        });
        const server = await (0, create_server_1.createServer)({});
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
                    auth: authentication_strategy_1.AUTHENTICATION_STRATEGY.JWT,
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
