import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**", "assets/**", "forms/**", "*.html"]
  },
  ...nextVitals
];

export default config;
