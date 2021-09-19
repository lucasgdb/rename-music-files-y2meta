module.exports = {
   root: true,
   env: {
      browser: false,
      node: true,
      es2021: true,
   },
   extends: ['airbnb-base', 'prettier'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
   },
   plugins: ['@typescript-eslint'],
   rules: {
      'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
   },
};
