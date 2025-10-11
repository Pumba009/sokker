import { ChromeStorage } from './storage';
import { ALARMS } from '../constants';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Nasłuchuje na address strony i uruchamia skrypt 'content/players_raport.js'
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
  if (message.action == ALARMS.SAVE_PLAYERS) {
    ChromeStorage.SavePlayersToStorage(message.payload).then((isSuccess) => {
      if (isSuccess) {
        return sendResponse({ status: 'ok' });
      }
      return sendResponse({ status: 'fail' });
    });
  }

  // Get Players
  if (message.action == ALARMS.GET_PLAYERS) {
    ChromeStorage.GetDataFromStorage().then((data) => {
      sendResponse(data);
    });
    return true; // async response
  }

  // Get Player By Name
  if (message.action == ALARMS.GET_PLAYER_BY_NAME) {
    ChromeStorage.GetPlayerByName(message.payload).then((data) => {
      sendResponse(data);
    });
    return true; // async response
  }
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
