module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    'prettier'
  ],
  overrides: [
  {
    // disable the rule specifically for tsx files
    "files": ["*.tsx"],
    "rules": {
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  }
  ],
  "parser": "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    "@typescript-eslint",
    'react'
  ],
  rules: {
  }
}
