import { afterEach, describe, expect, it } from "vitest";

import { run } from "./cli";

describe("cli", () => {
  const originalArgv = process.argv;

  afterEach(() => {
    process.argv = originalArgv;
  });

  it("should run with argument", async () => {
    process.argv = process.argv.slice(0, 2).concat(["test"]);
    await run();
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
