import { Linter } from "eslint";

/** @type {Linter.Config} */
const config = {
  // Regras e configurações vão aqui
  rules: {
    "semi": ["error", "always"],
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    "react-hooks/rules-of-hooks": "error",
  },
  // Outras configurações, como extensões de plugins e etc.
};

export default config;