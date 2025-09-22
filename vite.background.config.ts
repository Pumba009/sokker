import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false, // zachowujemy inne pliki
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'src/background/index.ts'),
        popup: resolve(__dirname, 'src/popup/index.ts'),
      },
      output: {
        entryFileNames: ({ name }) => {
          if (name === 'background') return 'background/index.js';
          if (name === 'popup') return 'popup/index.js';
          return '[name].js';
        },
        format: 'es', // background/popup mogą być ESM
      },
    },
  },
});
