import { baseConfig } from './packages/eslint-config/index.js';

export default [
  ...baseConfig,
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
];
