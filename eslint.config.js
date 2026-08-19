import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".next", "node_modules", "scripts", "*.config.ts", "*.config.js", "*.config.cjs", "next-sitemap.config.cjs", "next-env.d.ts", "postcss.config.js"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["app/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["*.config.ts", "*.config.js", "*.config.cjs", "next-sitemap.config.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);