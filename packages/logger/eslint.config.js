const { resolve } = require("node:path");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = [
  {
    ignores: ["dist/**", "node_modules/**", "*.js", "*.mjs", "*.cjs", "**/__tests__/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project,
      },
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
];

