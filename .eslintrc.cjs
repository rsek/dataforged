/**
 * @type { import('eslint').ESLint.ConfigData }
 */
module.exports = {
  extends: ['standard-with-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest'
  },
  rules: {
    'tsdoc/syntax': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
    ]
  }
}
