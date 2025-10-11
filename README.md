🚀 Jak uruchomić rozszerzenie Chrome lokalnie
📋 Wymagania

Zanim zaczniesz, upewnij się, że masz zainstalowane:

Node.js (zalecana wersja LTS, np. v18 lub v20)
🔗 Pobierz Node.js

npm – instaluje się automatycznie z Node.js
Sprawdź wersję:

node -v
npm -v

⚙️ Instalacja zależności

W folderze projektu uruchom:

npm install


To zainstaluje wszystkie wymagane paczki z pliku package.json do folderu node_modules.

🏗️ Budowanie rozszerzenia

Zbuduj projekt (np. z TypeScript do JavaScript) poleceniem:

npm run build


⚠️ Upewnij się, że w package.json masz zdefiniowany skrypt "build"
np. "build": "tsc" lub "build": "vite build" / "webpack --mode production"

Po wykonaniu komendy powinien się pojawić folder z gotową paczką (np. /dist ).

🌐 Wczytanie rozszerzenia w przeglądarce Chrome

Otwórz Chrome i przejdź do strony:

chrome://extensions/


Włącz Tryb deweloperski (prawy górny róg).

Kliknij przycisk „Załaduj rozpakowane” (Load unpacked).

Wskaż folder, w którym znajduje się Twój plik manifest.json
(zazwyczaj dist/ lub build/, jeśli bundler tam kopiuje pliki).

Gotowe 🎉 — rozszerzenie powinno się pojawić na liście.