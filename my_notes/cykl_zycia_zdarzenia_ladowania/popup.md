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
