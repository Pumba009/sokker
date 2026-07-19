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

// Info:
// W Manifest V3 dla Chrome:
// 1. Popup i Background mogą (i powinny) być modułami (es).
// 2. Content Scripts muszą być samowystarczalne (iife), ponieważ Chrome nie wspiera w nich natywnie modułów w prosty sposób.
