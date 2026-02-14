// // // Pobiera dane ze strony (np. liczby z tabeli)
// // const elements = document.querySelectorAll('.some-class');
// // const data = Array.from(elements).map((el) => parseFloat(el.textContent || '0'));

// // // Wysyła dane do background
// // chrome.runtime.sendMessage({ action: 'saveData', data });

// import { LoadCredentialsFromStorageViaMassage } from '../utils/storage_helper';

// function waitForElement<T extends Element>(selector: string): Promise<Element> {
//   return new Promise((resolve) => {
//     const el = document.querySelector(selector);
//     if (el) return resolve(el);

//     const observer = new MutationObserver(() => {
//       const el = document.querySelector(selector);
//       if (el) {
//         observer.disconnect();
//         resolve(el);
//       }
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });
//   });
// }

// // użycie
// waitForElement<HTMLFormElement>('.login__form form').then((loginForm) => {
//   console.log('formularz zaladowany');
//   login(loginForm as HTMLFormElement);
// });

// async function login(loginForm: HTMLFormElement) {
//   // to nie dziala, przegladarka ma zabezpieczenia ktore nie pozwalaja podac hasla
//   const userNameInput = loginForm.querySelector<HTMLInputElement>(
//     'input[type="text"][name="login"]',
//   );
//   const userPasswordInput = loginForm.querySelector<HTMLInputElement>(
//     'input[type="password"][name="password"]',
//   );

//   if (!userNameInput || !userPasswordInput) {
//     return;
//   }

//   const credentials = await LoadCredentialsFromStorageViaMassage();
//   if (!credentials) {
//     return;
//   }

//   userNameInput.value = credentials.username;
//   userPasswordInput.value = credentials.password;

//   // wymuś aktualizację dla frameworków i submitu
//   userNameInput.dispatchEvent(new Event('input', { bubbles: true }));
//   userPasswordInput.dispatchEvent(new Event('input', { bubbles: true }));
//   userNameInput.dispatchEvent(new Event('change', { bubbles: true }));
//   userPasswordInput.dispatchEvent(new Event('change', { bubbles: true }));

//   const button = loginForm.querySelector<HTMLButtonElement>('button[type="submit"]');
//   button?.click();
// }
