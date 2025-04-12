import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";


export default defineConfig([
  {ignores: ["dist/"]},
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
        rules: {
          'no-unused-vars': 'off', // Disable the rule for unused variables
          "@typescript-eslint/no-unused-vars": "off"
        },
  }
]);
