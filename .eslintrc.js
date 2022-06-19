module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: ["warn", 2],
    "linebreak-style": ["warn", "unix"],
    eqeqeq: ["error"],
    semi: ["off", "never"],
    quotes: ["error", "double"],
    propsValidation: [0],
    "react/prop-types": 0,
    scope: [0],
  },
}
