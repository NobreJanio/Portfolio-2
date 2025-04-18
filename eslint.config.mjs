import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Desabilita a regra para variáveis não utilizadas
      "@typescript-eslint/no-explicit-any": "off", // Desabilita a regra para tipo 'any'
      "react/no-unescaped-entities": "off" // Desabilita a regra para entidades não escapadas
    }
  }
];

export default eslintConfig;
