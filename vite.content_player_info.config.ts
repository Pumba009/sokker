import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false, // zachowujemy inne pliki
    rollupOptions: {
      input: {
        player_info: resolve(__dirname, 'src/content/player_info.ts'),
      },
      output: {
        entryFileNames: ({ name }) => `content/${name}.js`,
        format: 'iife', // self-contained, bez import/export
        inlineDynamicImports: true, // wszystkie zależności w jednym pliku
      },
    },
  },
});
