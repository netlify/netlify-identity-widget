import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default [
  // Global ignores
  {
    ignores: ["build/**", "example/**", "node_modules/**", "*.config.*.js"]
  },

  // Base recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Main source files
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
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
        HTMLIFrameElement: "readonly",
        Element: "readonly",
        Event: "readonly",
        CustomEvent: "readonly"
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

      // Import rules - TypeScript handles module resolution
      "import/no-unresolved": "off",
      "import/named": "off",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { vars: "all", args: "none", ignoreRestSiblings: true }
      ],
      "@typescript-eslint/no-explicit-any": "off",

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off" // Use TypeScript version instead
    }
  },

  // Test files (Vitest)
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    rules: {
      // Tests use dynamic imports and mocks
      "@typescript-eslint/no-unused-expressions": "off"
    }
  },

  // Prettier must be last to override other formatting rules
  prettier
];
