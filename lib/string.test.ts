import { describe, expect, it } from "vitest";

import { squash } from "./string";

describe("string", () => {
  it("should squash spaces", () => {
    expect(squash("   a b c ")).toBe("abc");
  });
});
