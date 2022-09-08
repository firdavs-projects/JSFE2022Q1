module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb-typescript'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        'curly': 'error',
        'prefer-const': 'error',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
};
