const config = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'quote-props': ['error', 'as-needed'],
    'import/no-unresolved': 'off',
    'no-console': 'warn',
    'no-debugger': 'warn',
    semi: 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'max-len': ['error', {
      code: 120,
      ignoreTrailingComments: true,
      ignorePattern: '.*@link',
    }],
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: false,
    }],
    'comma-spacing': ['error', {
      before: false,
      after: true,
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.test.*', '*.spec.*'],
      plugins: ['jest'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest/all',
      ],
      rules: {
        'jest/no-hooks': 'off',
        'jest/prefer-spy-on': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', {
          vars: 'local',
          args: 'after-used',
          ignoreRestSiblings: true,
        }],
      },
    },
  ],
  settings: {
    'import/resolver': {
      'babel-module': {
        configFile: './babel.jestConfig.js',
        root: ['./src'],
      },
      typescript: {},
    },
  },
};

module.exports = config;
