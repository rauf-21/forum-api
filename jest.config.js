/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/setup-test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
};
