module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:import/recommended', 'eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'no-object-literal-type-assertion': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'no-useless-constructor': 0,
    'no-empty-function': 0,
    'max-len': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', './', './src/types'],
      },
    },
  },
};
