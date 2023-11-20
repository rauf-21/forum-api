import { createServer, CreateServerDependencies } from "./create-server";

describe("HTTP server", () => {
  it("should have a response with a 404 status code if there is a request to an unregistered route", async () => {
    const server = await createServer(
      {} satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies
    );

    const response = await server.inject({
      method: "GET",
      url: "/unregisteredRoute",
    });

    expect(response.statusCode).toEqual(404);
  });

  it("should handle a server error correctly", async () => {
    const requestPayload = {
      username: "dicoding",
      fullname: "Dicoding Indonesia",
      password: "super_secret",
    };

    const server = await createServer(
      {} satisfies Partial<CreateServerDependencies> as unknown as CreateServerDependencies
    );

    const response = await server.inject({
      method: "POST",
      url: "/users",
      payload: requestPayload,
    });

    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual("error");
    expect(responseJson.message).toEqual("something went wrong on the server");
  });
});
