module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'airbnb-base/legacy',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // semi: ["error", "always"],
    // quotes: [2, 'single'],
    'linebreak-style': 0,
    'no-underscore-dangle': 'off'
    // 'allowTernary': true
  }
};
