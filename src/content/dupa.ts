// Pobiera dane ze strony (np. liczby z tabeli)
const elements = document.querySelectorAll('.some-class');
const data = Array.from(elements).map((el) => parseFloat(el.textContent || '0'));

// Wysyła dane do background
chrome.runtime.sendMessage({ action: 'saveData', data });
