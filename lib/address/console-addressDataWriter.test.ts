import { describe, expect, it, vi } from "vitest";

import { consoleAddressDataWriter } from "./console-addressDataWriter";

describe("console-addressDataWriter", () => {
  it("should write data", () => {
    const data = [
      {
        corrected: { city: "city", street: "street", zip: "zip" },
        original: { city: "city", street: "street", zip: "zip" },
      },
      {
        corrected: null,
        original: { city: "city", street: "street", zip: "zip" },
      },
    ];
    const logSpy = vi.spyOn(console, "log");

    consoleAddressDataWriter.write(data);

    expect(logSpy).toHaveBeenCalledWith(
      "street, city, zip -> street, city, zip",
    );
    expect(logSpy).toHaveBeenCalledWith("street, city, zip -> Invalid Address");
  });
});
