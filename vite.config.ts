import { defineConfig } from 'vite';
import { resolve } from 'path';

// nie używane, zastapiłem to 3 osobnymi konfiguracjimi vite.background, vite.content_player i vite.content_players
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // build only ES modules (Vite default)
    target: 'esnext',
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        //__dirname is the absolute path to the directory containing the source file
        background: resolve(__dirname, 'src/background/index.ts'), // storage.ts importowany w index.ts
        players: resolve(__dirname, 'src/content/players_raport.ts'),
        player: resolve(__dirname, 'src/content/player_stats.ts'),
        popup: resolve(__dirname, 'src/popup/popup.ts'),
        //popup_index: resolve(__dirname, 'src/popup/index.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        manualChunks(id) {
          if (id.includes('src/content')) return 'players';
        },
        format: 'iife', // TYLKO dla content scripts
      },
    },
  },
  // dla content scripts
});

/* zeby uzyc path (import { resolve } from "path";), trzeba:
 - npm install --save-dev @types/node
 - tsconfig.json dodac  
 "compilerOptions": {
    "types": ["node"]
  }
*/

/*
  Kod umieszczony w content script, background, popup uruchamia się w przeglądarce (w środowisku przeglądarki)
  path to wbudowany moduł Node.js
  vite.config.ts działa w Node.js, nie w przeglądarce.
    dodanie path do vite.config.ts jest OK

  Błędem jest dodawanie path do kodu extensiona (content/background/popup)
 */

//   // Funkcja do wspólnego bundlowania content scripts w jeden plik każdy
// const createContentBuild = (entry: string, outFile: string) => ({
//   build: {
//     outDir: "dist",
//     emptyOutDir: false, // zachowujemy inne pliki
//     rollupOptions: {
//       input: resolve(__dirname, entry),
//       output: {
//         entryFileNames: outFile,
//         format: "iife",        // self-contained, bez import/export
//         inlineDynamicImports: true, // wszystko w jednym pliku
//       },
//     },
//   },
// });

// export default defineConfig(
//   // 1. Content script: players
//   createContentBuild("src/content/players.ts", "content/players.js"),

//   // 2. Content script: player
//   createContentBuild("src/content/player.ts", "content/player.js"),

//   // 3. Background
//   {
//     build: {
//       outDir: "dist",
//       rollupOptions: {
//         input: resolve(__dirname, "src/background/index.ts"),
//         output: {
//           entryFileNames: "background/index.js",
//           format: "es", // background może być ES module
//         },
//       },
//     },
//   },

//   // 4. Popup
//   {
//     build: {
//       outDir: "dist",
//       rollupOptions: {
//         input: resolve(__dirname, "src/popup/index.ts"),
//         output: {
//           entryFileNames: "popup/index.js",
//           format: "es",
//         },
//       },
//     },
//   },
// );
