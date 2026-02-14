import { IPlayersData, IPlayer } from '../types/interfaces';
import { action } from '../constants';

export async function loadPlayersStatsFromStorageViaMassage(): Promise<IPlayersData> {
  return chrome.runtime.sendMessage({
    action: action.GET_PLAYERS,
  });
}

export async function loadPlayerStatsFromStorage(playerName: string): Promise<IPlayer> {
  return chrome.runtime.sendMessage({
    action: action.GET_PLAYER_BY_NAME,
    payload: playerName,
  });
}

export async function savePlayersStatsToStorageViaMassage(playersToLolcalStorage: IPlayersData) {
  chrome.runtime.sendMessage({
    action: action.SAVE_PLAYERS,
    payload: playersToLolcalStorage,
  });
  console.log('📦 Save Players using background: ', playersToLolcalStorage);
}

// export async function LoadCredentialsFromStorageViaMassage(): Promise<ICredentials> {
//   return chrome.runtime.sendMessage({
//     action: action.GET_CREDENTIALS,
//   });
// }

// export async function SaveCredentialsFromStorageViaMassage(data: ICredentials) {
//   // : Promise<boolean>
//   return chrome.runtime.sendMessage({
//     action: action.SAVE_CREDENTIALS,
//     payload: data,
//   });
// }
