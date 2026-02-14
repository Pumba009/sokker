import { storageKeys } from '../constants';
import { IPlayersData, IPlayer } from '../types/interfaces';

export class ChromeStorage {
  static async savePlayersToStorage(playersFromPage: IPlayersData): Promise<boolean> {
    try {
      await chrome.storage.local.set({
        [storageKeys.PLAYER_DATA]: JSON.stringify(playersFromPage),
      });
    } catch (e) {
      console.error('Błąd podczas zapisu do chrome.storage: ', e);
      return false;
    }
    return true;
  }

  static async getPlayerByName(playerName: string): Promise<IPlayer | undefined> {
    return await this.getDataFromStorage<IPlayersData>(storageKeys.PLAYER_DATA)
      .then((storageData) => storageData?.players.find((player) => player.name == playerName))
      .catch((e) => {
        console.error('Błąd podczas odczytu z chrome.storage: ', e);
        return undefined;
      });
  }

  // static async GetPlayerByName(playerName: string): Promise<IPlayer | undefined> {
  //   try {
  //     const storageData: IPlayerData | undefined = await this.GetDataFromStorage();
  //     return storageData?.players.find(player => player.name === playerName);
  //   } catch (e) {
  //     console.error('Błąd podczas odczytu z chrome.storage: ', e);
  //     return undefined;
  //   }
  // }

  static async getDataFromStorage<T>(storageKey: string): Promise<T | null> {
    try {
      const result = await chrome.storage.local.get([storageKey]);
      return JSON.parse(result[storageKey]);
    } catch (e) {
      console.error('Błąd podczas odczytu z chrome.storage: ', e);
      return null;
    }

    // Aby pobrać dane z chrome.storage.local:
    // chrome.storage.local.get(null, function(items) {
    // 	console.log(items);
    // });
    // null oznacza: pobierz wszystkie dane.
  }

  static async saveDataToStorage<T>(storageKey: string, data: T): Promise<boolean> {
    try {
      await chrome.storage.local.set({ [storageKey]: JSON.stringify(data) });
    } catch (e) {
      console.error('Błąd podczas zapisu do chrome.storage: ', e);
      return false;
    }
    return true;
  }
}

// cos z ChataGpt

// import { WeeklyDataPoint } from "../types/data";

// export async function saveWeeklyData(newValue: number) {
//   const result = await chrome.storage.local.get("weeklyData");
//   const data: WeeklyDataPoint[] = result.weeklyData || [];

//   const updated: WeeklyDataPoint[] = [
//     ...data,
//     { timestamp: Date.now(), value: newValue }
//   ];

//   await chrome.storage.local.set({ weeklyData: updated });
// }

// export async function getWeeklyData(): Promise<WeeklyDataPoint[]> {
//   const result = await chrome.storage.local.get("weeklyData");
//   return result.weeklyData || [];
// }
