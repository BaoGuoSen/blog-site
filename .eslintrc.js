module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    // "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest'
  },
  plugins: ['react', '@typescript-eslint'],
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   * 配置规则 @see https://www.bbsmax.com/A/gVdngQqlzW/
   */
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-console': 1,
    'no-const-assign': 2,
    'no-constant-condition': 2,
    'no-else-return': 2,
    'no-empty': 2,
    'no-func-assign': 2,
    'no-inline-comments': 2,
    'no-irregular-whitespace': 2,
    'no-lone-blocks': 2,
    'no-lonely-if': 2,
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': [2, { max: 1 }],
    semi: [2, 'never'],
    'no-trailing-spaces': 2,
    'array-bracket-spacing': [2, 'never'],
    camelcase: 2,
    'comma-spacing': 2,
    indent: [2, 2],
    'object-curly-spacing': [2, 'always'],
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'comma-dangle': [2, 'never']
  }
}
