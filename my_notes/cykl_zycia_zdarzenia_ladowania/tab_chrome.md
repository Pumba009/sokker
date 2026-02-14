2️⃣ Poczekać aż otwarta strona WWW się załaduje

(np. chcesz wykonać kod po chrome.tabs.create)

✔ Poprawny sposób (Manifest V3)

```
chrome.tabs.create({ url: 'https://example.com' }, (tab) => {
  if (!tab.id) return;

  chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
    if (tabId === tab.id && info.status === 'complete') {
      chrome.tabs.onUpdated.removeListener(listener);

      console.log('Strona załadowana');
      // tutaj robisz co chcesz
    }
  });
});
```

📌 info.status === 'complete' = cała strona się załadowała

1️⃣ function listener — co to w ogóle jest?

```
function listener(tabId, info) {
  ...
}
```

❓ Czy listener to jakaś specjalna funkcja?
❌ Nie.
✅ listener to zwykła nazwa funkcji, wymyślona przez programistę

2️⃣ Skąd biorą się parametry tabId, info?
🔑 Odpowiedź:
Chrome je przekazuje automatycznie, gdy zdarzenie wystąpi.

```
chrome.tabs.onUpdated.addListener(listener);
```

📌 onUpdated to EventEmitter (źródło zdarzeń).

Kiedy karta:

- zacznie się ładować
- skończy się ładować
- zmieni URL

Chrome woła Twoją funkcję i przekazuje dane:

```
(tabId, changeInfo, tab)
```

W praktyce:

```
function listener(tabId, info) {
  // tabId → ID karty
  // info.status → "loading" | "complete"
}
```

👉 To jest programowanie zdarzeniowe (event-driven).

3️⃣ Dlaczego chrome.tabs.onUpdated?

Bo:

- ładowanie strony jest asynchroniczne
- nie da się „zatrzymać” JS i czekać

onUpdated mówi:

„Powiadom mnie, kiedy coś się zmieni w karcie”

4️⃣ Czy są alternatywy dla onUpdated?
✔ Tak, ale zależnie od celu
🟢 Najlepsza alternatywa: content script

```
"content_scripts": [{
  "matches": ["https://example.com/*"],
  "js": ["content.js"],
  "run_at": "document_idle"
}]
```

👉 Najczystsze rozwiązanie, jeśli chcesz działać na stronie.

🟡 chrome.webNavigation.onCompleted

```
chrome.webNavigation.onCompleted.addListener((details) => {
  console.log('Strona załadowana');
});
```

✔ dokładniejsze niż tabs.onUpdated
❌ wymaga permission: "webNavigation"

🔴 setTimeout / setInterval

❌ zły pomysł, nietrwałe, losowe
