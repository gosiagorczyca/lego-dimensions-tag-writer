module.exports = {
    root: true,
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.android.js',
                    '.android.ts',
                    '.android.tsx',
                    '.ios.js',
                    '.ios.ts',
                    '.ios.tsx',
                    '.js',
                    '.native.js',
                    '.ts',
                    '.tsx',
                ],
            },
        },
    },
    plugins: ['simple-import-sort'],
    extends: [
        'satya164',
        'plugin:react-native/all',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'babel/no-unused-expressions': 'off',
        'flowtype/array-style-simple-type': 'off',
        'flowtype/no-types-missing-file-annotation': 'off',
        'flowtype/no-unused-expressions': 'off',
        'jest/consistent-test-it': ['error', { fn: 'test' }],
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-native/no-raw-text': 'off',
        'react-native/split-platform-components': 0,
        'react/jsx-sort-props': ['error'],

        'import/extensions': [
            'error',
            {
                js: 'never',
                json: 'always',
                ts: 'never',
                tsx: 'never',
                png: 'always',
                jpg: 'always',
            },
        ],

        'import/no-unresolved': [
            'error',
            {
                caseSensitive: false,
                ignore: [
                    '@assets',
                    '@assets/*',
                    '@app',
                    '@app/*',
                    '@config/*',
                    '@di',
                    '@auth',
                    '@auth/*',
                    '@shared',
                    '@shared/*',
                    '@home',
                    '@home/*',
                    '@http',
                    '@http/*',
                    '@geolocation',
                    '@geolocation/*',
                    '@navigation',
                    '@navigation/*',
                    '@locale',
                    '@locale/*',
                    '@offers',
                    '@offers/*',
                    '@profile',
                    '@profile/*',
                    '@register',
                    '@register/*',
                    '@settings',
                    '@settings/*',
                    '@store',
                    '@store/*',
                    '@ui',
                    '@ui/*',
                ],
            },
        ],

        'prettier/prettier': [
            'error',
            {
                bracketSpacing: true,
                jsxBracketSameLine: false,
                parser: 'typescript',
                printWidth: 100,
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'all',
                useTabs: false,
            },
        ],

        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'generic',
                readonly: 'generic',
            },
        ],

        'sort-imports': 'off',

        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^\\u0000'],
                    ['^@?\\w'],
                    [
                        '^(@app|@assets|@auth|@config|@di|@geolocation|@home|@http|@locale|@navigation|@offers|@profile|@register|@settings|@shared|@store|@ui)(/.*|$)',
                    ],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ],
            },
        ],

        '@typescript-eslint/ban-ts-comment': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/export': 'off',
        'no-case-declarations': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'react/no-unused-prop-types': 'off' /** remove after */,
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-commonjs': 'off',
        'no-useless-constructor': 'off',
    },
};
