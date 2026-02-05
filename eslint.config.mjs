import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import babelParser from "@babel/eslint-parser";

export default [
  // Global ignores
  {
    ignores: ["build/**", "example/**", "node_modules/**", "*.config.*.js"]
  },

  // Base recommended rules
  js.configs.recommended,

  // Main source files
  {
    files: ["src/**/*.js", "src/**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-env"],
          plugins: [
            ["@babel/plugin-transform-react-jsx", { pragma: "h" }]
          ]
        }
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        console: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        FormData: "readonly",
        HTMLElement: "readonly",
        Element: "readonly",
        Event: "readonly",
        CustomEvent: "readonly",
        // Node/CommonJS globals
        process: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "writable",
        __dirname: "readonly",
        __filename: "readonly"
      }
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin
    },
    settings: {
      react: {
        pragma: "h",
        version: "16.0"
      },
      "import/ignore": [
        // Vite query suffixes like ?inline, ?raw, ?url, etc.
        "\\?inline$",
        "\\?raw$",
        "\\?url$"
      ]
    },
    rules: {
      // React/Preact rules
      ...reactPlugin.configs.recommended.rules,
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "react/no-unescaped-entities": "off",

      // Import rules - ignore Vite query parameters
      "import/no-unresolved": ["error", { ignore: ["\\?inline$", "\\?raw$", "\\?url$"] }],
      "import/named": "error",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": [
        "error",
        { vars: "all", args: "none", ignoreRestSiblings: true }
      ]
    }
  },

  // Test files
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly"
      }
    }
  },

  // Prettier must be last to override other formatting rules
  prettier
];
