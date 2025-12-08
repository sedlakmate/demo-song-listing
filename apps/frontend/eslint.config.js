const { resolve } = require("node:path");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = [
  {
    ignores: ["dist/**", "node_modules/**", ".next/**", "*.js", "*.mjs", "*.cjs"],
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
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        document: "readonly",
        window: "readonly",
        fetch: "readonly",
        navigator: "readonly",
        require: "readonly",
        process: "readonly",
        alert: "readonly",
        React: "readonly",
        JSX: "readonly",
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

