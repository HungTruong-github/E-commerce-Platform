import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/**
 * Base ESLint config for all TypeScript packages in the monorepo.
 */
export const baseConfig = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
  {
    ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**', '.turbo/**'],
  },
);

export default baseConfig;
