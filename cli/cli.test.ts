import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterEach, describe, expect, it } from "vitest";

import validAddressResponse from "../test/fixtures/validAddressResponse.json";
import { run } from "./cli";

/*
These are intgration style tests. They test the entire application from the command line to the API.
Real files are read from the file system and mock service worker is used to intercept the network requests and return a response.
Using the real file system and network requests makes these tests highly representative of the real application.
*/
describe("cli", () => {
  const originalArgv = process.argv;

  afterEach(() => {
    process.argv = originalArgv;
  });

  it("should run with argument", async () => {
    process.argv = process.argv
      .slice(0, 2)
      .concat(["./test/fixtures/test.csv"]);
    const server = setupServer();
    server.listen();
    server.use(
      http.get(
        "https://us-street.api.smarty.com/street-address",
        ({ request }) => {
          const url = new URL(request.url);
          const zipcode = String(url.searchParams.get("zipcode"));
          const shouldUseValidAddressResponse = zipcode === "43215";
          return new HttpResponse(
            JSON.stringify(
              shouldUseValidAddressResponse ? validAddressResponse : [],
            ),
            {
              status: 200,
            },
          );
        },
      ),
    );

    await run();
    server.close();
  });

  it("should not run without argument", async () => {
    process.argv = process.argv.slice(0, 2);

    await expect(run()).rejects.toThrowError();
  });

  it("should run with --help", async () => {
    process.argv = process.argv.slice(0, 2).concat(["--help"]);

    await run();
  });
});
