import { defineConfig } from 'vite';
import paths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [paths()],
  build: {
    target: 'ESNext',
    lib: {
      entry: 'src/index.ts',
      name: 'composition',
      formats: ['es']
    }
  }
});
