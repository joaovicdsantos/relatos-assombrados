export default {
  extends: ['plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
