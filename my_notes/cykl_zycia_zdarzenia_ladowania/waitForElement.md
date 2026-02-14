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

„Niezbędne dla SPA – DOMContentLoaded to za mało” — o co chodzi?
🔍 Co to SPA?

Single Page Application (React, Vue, Angular)

➡ Strona:

- ładuje się raz
- potem JS dynamicznie zmienia DOM
- bez przeładowania strony

❗ Problem

```
document.addEventListener('DOMContentLoaded', ...)
```

🔥 Ten event odpala się TYLKO RAZ
❌ a elementy często pojawiają się później

Dlatego:

DOM gotowy ≠ element istnieje

6️⃣ waitForElement — co tam się dzieje krok po kroku?

```
function waitForElement(selector) {
  return new Promise((resolve) => {
```

🔹 Promise — co to?

Promise = obietnica:

„Oddam Ci wynik w przyszłości”
🔹 1. Sprawdzamy, czy element już istnieje

```
const el = document.querySelector(selector);
if (el) return resolve(el);
```

✔ jeśli tak → kończymy Promise

🔹 2. Jeśli nie — obserwujemy DOM

```
const observer = new MutationObserver(() => {
```

❓ Co to MutationObserver?
API przeglądarki, które:

- nasłuchuje zmian w DOM
- dodanie / usunięcie elementów
- zmiany atrybutów

🔹 3. Nasłuchiwanie zmian

```
observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

To znaczy:

- childList → dodano/usunięto element
- subtree → patrz na cały DOM

🔹 4. Gdy element się pojawi

```
observer.disconnect();
resolve(el);
```

📌 resolve(el):

- kończy Promise
- przekazuje el do .then() albo await

7️⃣ Co to jest resolve?

```
resolve(value);
```

✔ mówi:

„Obietnica spełniona”

Dzięki temu możesz pisać:

```
await waitForElement('#app');
```

zamiast:

```
setInterval(...)
```
