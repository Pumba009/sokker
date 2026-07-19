import { IPlayersData } from '../types/interfaces';
import { savePlayersStatsToStorageViaMassage } from '../utils/storage_helper';
import { formatNumber } from '../utils/format_helper';

document.addEventListener('DOMContentLoaded', () => {
    const thresholdInput = document.getElementById('threshold') as HTMLInputElement;
    const statusText = document.getElementById('status') as HTMLElement;
    const importBtn = document.getElementById('importBtn');
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    // Elementy sterujące widokami
    const settingsBtn = document.getElementById('settingsBtn');
    const mainView = document.getElementById('mainView');
    const settingsView = document.getElementById('settingsView');

    // 0. Obsługa przełączania widoków (zębatka)
    if (settingsBtn && mainView && settingsView) {
        settingsBtn.addEventListener('click', () => {
            const isSettingsHidden = settingsView.classList.contains('hidden');
            if (isSettingsHidden) {
                settingsView.classList.remove('hidden');
                mainView.classList.add('hidden');
            } else {
                settingsView.classList.add('hidden');
                mainView.classList.remove('hidden');
            }
        });
    }

    // 1. Obsługa progu zaproszeń
    if (thresholdInput) {
        chrome.storage.local.get('invitationThreshold', (data) => {
            if (data.invitationThreshold) {
                thresholdInput.value = formatNumber(data.invitationThreshold);
            }
        });

        thresholdInput.addEventListener('change', () => {
            const cleanedValue = cleanNumber(thresholdInput.value);
            if (cleanedValue) {
                chrome.storage.local.set({ invitationThreshold: cleanedValue }, () => {
                    setStatusText(true, 'Zapisano!');
                });
            } else {
                setStatusText(false, '');
            }
        });

        thresholdInput.addEventListener('input', () => {
            const cleanedValue = cleanNumber(thresholdInput.value) ?? 0;
            thresholdInput.value = formatNumber(cleanedValue);
        });
    }

    // 2. Obsługa przycisku i inputu importu
    if (importBtn && fileInput) {
        importBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', importPlayers);
    }

    const link = document.getElementById('external-link') as HTMLAnchorElement;
    if (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // blokuje domyślne zachowanie
            chrome.tabs.create({ url: this.href }); // otwiera link w nowej karcie
        });
    }

    function importPlayers(event: Event) {
        const input = event.target as HTMLInputElement;
        const statusText = document.getElementById('status') as HTMLElement;
        if (!input.files?.length) {
            return;
        }

        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const text = e.target?.result as string;
            try {
                const data = JSON.parse(text) as IPlayersData;
                await savePlayersStatsToStorageViaMassage(data);
                setStatusText(true, 'Zapisano!');
            } catch {
                setStatusText(true, 'Błąd importu!');
            }
            setTimeout(() => {
                if (statusText) {
                    statusText.textContent = '';
                }
            }, 3000);
        };

        reader.readAsText(file, 'UTF-8');
    }

    // metody pomocnicze
    function setStatusText(isSuccess: boolean, message: string) {
        if (statusText) {
            if (isSuccess) {
                statusText.style.color = '#27ae60';
                statusText.textContent = message;
            } else {
                statusText.style.color = '#e74c3c';
                statusText.textContent = message;
            }

            setTimeout(() => {
                statusText.textContent = '';
            }, 2000);
        }
    }

    function cleanNumber(value: string): number | null {
        if (value) {
            // \D szuka wszystkiego, co NIE JEST cyfrą i zamienia to na pusty ciąg znaków
            value = value.replace(/\D/g, '');
            const numericValue = parseInt(value, 10);
            if (!isNaN(numericValue)) {
                return numericValue;
            }
        }
        return null;

        // \D – oznacza "każdy znak, który nie jest cyfrą" (duża litera D to przeciwieństwo małej
        // \d, która szuka cyfr).
        // g – flaga global, dzięki której silnik szuka wszystkich takich znaków w całym tekście, a nie tylko pierwszego napotkanego.
    }
});

// Info do Importu w .html
// Dodanie type="module" w HTML pozwala przeglądarce zrozumieć instrukcje import, które Vite wstawia do pliku index.js, gdy korzystasz ze współdzielonych helperów
