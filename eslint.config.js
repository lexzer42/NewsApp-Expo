import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx,mjs}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        // Add Node.js globals
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        global: 'readonly',
        // Add Jest globals
        jest: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['error'] }],
      '@typescript-eslint/no-require-imports': 'warn',
    },
    ignores: ['node_modules/**', 'coverage/**', 'jest.setup.ts'],
  },
  // Special config for CJS files
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        global: 'readonly',
        jest: 'readonly',
      },
    },
  },
];
