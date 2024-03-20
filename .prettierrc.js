module.exports = {
  printWidth: 120,
  endOfLine: "lf",
  singleQuote: true,
  trailingComma: "none",
  bracketSameLine: false,
  htmlWhitespaceSensitivity: "strict",
  singleAttributePerLine: true,
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss",
  ],
};
