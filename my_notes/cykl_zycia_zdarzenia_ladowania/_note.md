Cykl życia strony i zdarzenia ładowania w JavaScript (Chrome Extensions)

Jedno zdanie do zapamiętania

"Strona może być załadowana, ale DOM jeszcze nie gotowy – albo DOM gotowy, ale elementu jeszcze nie ma."

➡ Strona:

- ładuje się raz
- potem JS dynamicznie zmienia DOM
- bez przeładowania strony

```
document.addEventListener('DOMContentLoaded', ...)
```

🔥 Ten event odpala się TYLKO RAZ

❌ a elementy często pojawiają się później

Dlatego:
DOM gotowy ≠ element istnieje

Zależy gdzie i co dokładnie chcesz „poczekać aż strona się załaduje” — w rozszerzeniach Chrome są 3 różne przypadki. Poniżej masz konkretne i poprawne wzorce

1️⃣ W popup.js – poczekać aż DOM popupu się załaduje

```
document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('external-link') as HTMLAnchorElement;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: link.href });
  });
});
```

📌 Używaj zawsze DOMContentLoaded w popupach
Popup jest tworzony i niszczony dynamicznie.

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

3️⃣ W content script – poczekać na DOM strony

(najczystsze rozwiązanie)

```
manifest.json
{
  "content_scripts": [{
    "matches": ["https://example.com/*"],
    "js": ["content.js"],
    "run_at": "document_idle"
  }]
}
```

content.js

```
console.log('DOM strony gotowy');
```

📌 document_idle = DOM gotowy + większość zasobów wczytana
📌 Najlepsze miejsce do manipulacji stroną

4️⃣ Czekanie na konkretny element (SPA, React, Vue)

```
function waitForElement(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// użycie
waitForElement('#app').then(el => {
  console.log('Element znaleziony:', el);
});
```

📌 Niezbędne dla SPA – DOMContentLoaded to za mało

🧠 TL;DR
| Gdzie | Co zrobić |
| -------------- | ----------------------- |
| popup.js | `DOMContentLoaded` |
| nowa karta | `chrome.tabs.onUpdated` |
| content script | `run_at: document_idle` |
| SPA / React | `MutationObserver` |
