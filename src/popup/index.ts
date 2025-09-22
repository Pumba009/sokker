import { IPlayersData } from '../types/interfaces';
import { SavePlayersToStorageViaMassage } from '../utils/storage_helper';

document.body.insertAdjacentHTML('beforeend', '<p>Popup działa ✅</p>');

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btnImport');
  if (btn) {
    btn.addEventListener('click', () => {
      //document.body.insertAdjacentHTML('beforeend', '<p>'+ ++counter + '</p>');
    });
  }

  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', importPlayers);
  }
});

function importPlayers(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  // 2. onload odpala się dopiero po chwili, kiedy plik zostanie juz odczytany.
  reader.onload = async (e) => {
    const text = e.target?.result as string;

    try {
      const data = JSON.parse(text) as IPlayersData;
      await SavePlayersToStorageViaMassage(data);
      document.body.insertAdjacentHTML('beforeend', '<p>Import succeed ✅</p>');
    } catch {
      document.body.insertAdjacentHTML('beforeend', '<p>Import failed ❌</p>');
    }
  };

  // 1. readAsText wywołuje sie jako pierwsza, readAsText działa asynchronicznie.
  reader.readAsText(file, 'UTF-8');
}
