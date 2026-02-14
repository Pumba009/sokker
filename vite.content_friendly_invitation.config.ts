import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false, // zachowujemy inne pliki
    rollupOptions: {
      input: {
        friendly_invitations: resolve(__dirname, 'src/content/friendly_invitations.ts'),
      },
      output: {
        entryFileNames: ({ name }) => `content/${name}.js`,
        format: 'iife', // self-contained, bez import/export
        inlineDynamicImports: true, // wszystkie zależności w jednym pliku
      },
    },
  },
});
