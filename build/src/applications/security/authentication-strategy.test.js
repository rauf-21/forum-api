"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_strategy_1 = require("./authentication-strategy");
describe("AuthenticationStrategy", () => {
    it("should throw an error if it is directly instantiated", () => {
        // @ts-expect-error create an instance of an abstract class
        expect(() => new authentication_strategy_1.AuthenticationStrategy("", "", {})).toThrow("cannot instantiate abstract class");
    });
});
