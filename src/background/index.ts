import { ChromeStorage } from './storage';
import { action, storageKeys } from '../constants';
import { IPlayersData } from '../types/interfaces';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Nasłuchuje na address strony i uruchamia skrypt 'content/players_raport.js'
//chrome.webNavigation.onHistoryStateUpdated działa tylko gdy strona używa history.pushState / SPA.
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.url.includes('/pl/app/training/main-team-progress/')) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['content/players_raport.js'],
    });
  }
});

// Nasłuch na event z content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Save Players
  if (message.action == action.SAVE_PLAYERS) {
    ChromeStorage.savePlayersToStorage(message.payload).then((isSuccess) => {
      if (isSuccess) {
        return sendResponse({ status: 'ok' });
      }
      return sendResponse({ status: 'fail' });
    });
  }

  // Get Players
  if (message.action == action.GET_PLAYERS) {
    ChromeStorage.getDataFromStorage<IPlayersData>(storageKeys.PLAYER_DATA).then((data) => {
      sendResponse(data);
    });
    return true; // async response <-- to jest kluczowe
    //W Chrome Extensions, jeśli sendResponse jest wywoływane asynchronicznie (czyli w .then()),
    //  musisz zwrócić true z listenera wiadomości, żeby powiedzieć Chrome, że odpowiedź nadejdzie później
  }

  // Get Player By Name
  if (message.action == action.GET_PLAYER_BY_NAME) {
    ChromeStorage.getPlayerByName(message.payload).then((data) => {
      sendResponse(data);
    });
    return true; // async response
  }

  //Open page & get team value
  if (message.action == 'OPEN_TAB') {
    //chrome.tabs.create({ url: message.url });

    return true; // async response
  }

  //do usuniecia - logowanie nie działa
  // const action = message.action as string;
  // switch (action) {
  //   case ALARMS.GET_CREDENTIALS:
  //     console.log('switch');
  //     console.log(ALARMS.GET_CREDENTIALS);
  //     ChromeStorage.GetDataFromStorage<ICredentials>(STORAGE_KEYS.CREDENTIALS).then((data) => {
  //       sendResponse(data);
  //     });
  //     return true; // <-- to jest kluczowe
  //   case ALARMS.SAVE_CREDENTIALS:
  //     console.log(ALARMS.SAVE_CREDENTIALS);
  //     ChromeStorage.SaveDataToStorage<ICredentials>(STORAGE_KEYS.CREDENTIALS, message.payload).then(
  //       (isSuccess) => {
  //         if (isSuccess) {
  //           return sendResponse({ status: 'ok' });
  //         }
  //         return sendResponse({ status: 'fail' });
  //       },
  //     );
  //     return true; // <-- to jest kluczowe
  //   default:
  //     console.log('switch dziala');
  // }

  return true; // <-- to jest kluczowe
});

/*
Podsumowanie
  Jeśli content ma działać na stronie, lepiej używać messaging niż importować storage.ts.

  background jest centralnym miejscem do trzymania danych.

  content i popup mogą prosić background o dane (chrome.runtime.sendMessage - przykład w 'utils/storage_helpers.ts')
 */

// // Uruchamia alarm przy instalacji
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.alarms.create('weeklyData', { periodInMinutes: 60 * 24 * 7 }); // raz na tydzień
// });

// // Obsługuje alarm
// chrome.alarms.onAlarm.addListener(async (alarm) => {
//   if (alarm.name === 'weeklyData') {
//     // Aktywna zakładka
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     if (tab?.id) {
//       // Wstrzykujemy content script do zakładki żeby pobrać dane
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ["content.js"]
//       });
//     }
//   }
// });

// moze zrobic alarm ktory by sprawdzał czy minął tydzien od ostatniego updetu i pobierał dane
