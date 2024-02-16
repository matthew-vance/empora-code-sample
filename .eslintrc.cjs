module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic",
    "prettier",
  ],
  ignorePatterns: ["dist", "coverage", "node_modules"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort", "import"],
  root: true,
  rules: {
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-keys": ["error", "asc", { caseSensitive: false, natural: true }],
    "sort-vars": ["error", { ignoreCase: true }],
  },
  settings: {
    "import/resolver": {
      node: true,
      typescript: true,
    },
  },
};
