const {resolve} = require("node:path");
const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    env: {
        node: true,
        es6: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: [project],
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    overrides: [
        {
            files: ["**/__tests__/**/*"],
            env: {
                jest: true,
            },
        },
    ],
};