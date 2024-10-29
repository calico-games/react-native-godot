module.exports = {
  root: true,
  extends: ['eslint:recommended', '@react-native', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-shadow': 'off',
    'no-alert': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-native/no-unused-styles': 1,
  },
  requireConfigFile: false,
};
