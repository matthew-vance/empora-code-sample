import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      exclude: ["bin/**/*", "scripts/**/*", ".eslintrc.cjs"],
    },
  },
});
