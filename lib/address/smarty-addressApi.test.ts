import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import validAddressResponse from "../../test/fixtures/validAddressResponse.json";
import { smartyAddressApi } from "./smarty-addressApi";

describe("smarty-addressApi", () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should return address when valid", async () => {
    server.use(
      http.get("https://us-street.api.smarty.com/street-address", () => {
        return new HttpResponse(JSON.stringify(validAddressResponse), {
          status: 200,
        });
      }),
    );

    const address = {
      city: "Rockville",
      street: "1 E Jefferson St",
      zip: "20850-3131",
    };

    const correctedAddress =
      await smartyAddressApi.getCorrectedAddress(address);

    expect(correctedAddress).toEqual(address);
  });

  it("should throw when fetch fails", async () => {
    server.use(
      http.get("https://us-street.api.smarty.com/street-address", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const address = {
      city: "city",
      street: "street",
      zip: "zip",
    };

    expect(smartyAddressApi.getCorrectedAddress(address)).rejects.toThrowError(
      "Error fetching data from Smarty API",
    );
  });

  it("should return null when address is invalid", async () => {
    server.use(
      http.get("https://us-street.api.smarty.com/street-address", () => {
        return new HttpResponse(JSON.stringify([]), { status: 200 });
      }),
    );

    const address = {
      city: "city",
      street: "street",
      zip: "zip",
    };

    const correctedAddress =
      await smartyAddressApi.getCorrectedAddress(address);

    expect(correctedAddress).toBeNull();
  });

  it("should throw when response is invalid", async () => {
    server.use(
      http.get("https://us-street.api.smarty.com/street-address", () => {
        return new HttpResponse(JSON.stringify({}), { status: 200 });
      }),
    );

    const address = {
      city: "city",
      street: "street",
      zip: "zip",
    };

    expect(smartyAddressApi.getCorrectedAddress(address)).rejects.toThrowError(
      "Error parsing data from Smarty API",
    );
  });
});
