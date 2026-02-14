import { IPlayersData } from '../types/interfaces';
import { savePlayersStatsToStorageViaMassage } from '../utils/storage_helper';

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', importPlayers);
  }

  const link = document.getElementById('external-link') as HTMLAnchorElement;
  if (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // blokuje domyślne zachowanie
      chrome.tabs.create({ url: this.href }); // otwiera link w nowej karcie
    });
  }

  // const buttonInput = document.querySelector<HTMLInputElement>('#button'); //HTMLButtonElement

  // console.log(buttonInput);
  // if (buttonInput) {
  //   buttonInput.addEventListener('click', SaveCredentialsToStorage);
  // }
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
      await savePlayersStatsToStorageViaMassage(data);
      document.body.insertAdjacentHTML('beforeend', '<p>Import succeed ✅</p>');
    } catch {
      document.body.insertAdjacentHTML('beforeend', '<p>Import failed ❌</p>');
    }
  };

  // 1. readAsText wywołuje sie jako pierwsza, readAsText działa asynchronicznie.
  reader.readAsText(file, 'UTF-8');
}

// logowanie nie dziala
// async function SaveCredentialsToStorage(): Promise<boolean> {
//   //document: Document

//   //   const userNameInput = loginForm.querySelector<HTMLInputElement>(
//   //   'input[type="text"][name="login"]',
//   // );
//   //const userNameInput = document.getElementById('userName') as HTMLInputElement;
//   const userNameInput = document.querySelector<HTMLInputElement>('#userName');
//   const passwordInput = document.querySelector<HTMLInputElement>('#password');

//   if (!userNameInput || !passwordInput) {
//     return false;
//   }

//   const credentials = new Credentials(userNameInput.value, passwordInput.value);

//   const result = await SaveCredentialsFromStorageViaMassage(credentials);
//   console.log(result);

//   return true;
// }
