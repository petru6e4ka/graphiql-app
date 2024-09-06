import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTest.ts',
    coverage: {
      exclude: [
        'next.config.mjs',
        'postcss.config.cjs',
        'vitest.config.ts',
        '.lintstagedrc.js',
        'src/middleware.ts',
        'src/features/localeSwitcher/config/i18n.ts',
        'src/features/localeSwitcher/config/request.ts',
        'src/features/authSwitcher/lib/authOptions.ts',
      ],
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
});
