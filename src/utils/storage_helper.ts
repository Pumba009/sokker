import { IPlayersData, IPlayer } from '../types/interfaces';
import { ALARMS } from '../constants';

export async function LoadPlayersFromStorageViaMassage(): Promise<IPlayersData> {
  return chrome.runtime.sendMessage({
    action: ALARMS.GET_PLAYERS,
  });
}

export async function LoadPlayerByNameFromStorage(playerName: string): Promise<IPlayer> {
  return chrome.runtime.sendMessage({
    action: ALARMS.GET_PLAYER_BY_NAME,
    payload: playerName,
  });
}

export async function SavePlayersToStorageViaMassage(playersToLolcalStorage: IPlayersData) {
  chrome.runtime.sendMessage({
    action: ALARMS.SAVE_PLAYERS,
    payload: playersToLolcalStorage,
  });
  console.log('📦 Save Players using background: ', playersToLolcalStorage);
}
