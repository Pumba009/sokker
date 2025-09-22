import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true, // usuwa pliki
    rollupOptions: {
      input: {
        player_stats: resolve(__dirname, 'src/content/player_stats.ts'),
      },
      output: {
        entryFileNames: ({ name }) => `content/${name}.js`,
        format: 'iife', // self-contained, bez import/export
        inlineDynamicImports: true, // wszystkie zależności w jednym pliku
      },
    },
  },
});
