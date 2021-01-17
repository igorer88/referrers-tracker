module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['html', 'vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    //disable rule of space before function parentheses
    'space-before-function-paren': ['warn', 'never'],
    // allow paren-less arrow functions
    'arrow-parens': ['error', 'as-needed'],
    // allow async-await
    'generator-star-spacing': 'warn'
  }
};
