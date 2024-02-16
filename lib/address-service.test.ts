import { describe, expect, it, vi } from "vitest";

import { newAddressService } from "./address-service";

const reader = {
  read: () =>
    Promise.resolve([
      {
        city: "city",
        street: "street",
        zip: "zip",
      },
    ]),
};

const writer = {
  write: vi.fn(),
};

describe("address-service", () => {
  it("should correct addresses", async () => {
    const addressService = newAddressService({ reader, writer });
    await addressService.correctAddresses();
    expect(writer.write).toHaveBeenCalledWith([
      {
        city: "city",
        street: "street",
        zip: "zip",
      },
    ]);
  });
});
