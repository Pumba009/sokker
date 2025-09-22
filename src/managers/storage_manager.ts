import { IPlayer, IPlayersData } from '../types/interfaces';
import { Player } from '../types/player';
import { DateHelper } from '../utils/date_helper';
import { WEEK_IN_MILISECONDS } from '../constants';
import {
  LoadPlayersFromStorageViaMassage,
  SavePlayersToStorageViaMassage,
} from '../utils/storage_helper';

export class StorageManager {
  private playersFromStorage: IPlayersData;

  constructor(players: IPlayersData) {
    this.playersFromStorage = players;
  }

  static async Create() {
    const players = await LoadPlayersFromStorageViaMassage();
    return new StorageManager(players);
  }

  public async UpdateRaport(playersFromPage: IPlayer[]) {
    if (this.isStoreEmpty()) {
      console.log('Storage is empty. Adding players to storage for the First Time!');
      return await this.addToStorage(playersFromPage);
    }

    if (this.shouldUpdateStorage(this.playersFromStorage.lastUpdateDay)) {
      console.log('It is update day!');
      return await this.updateAllPlayers(playersFromPage, this.playersFromStorage);
    }

    console.log('It is not update day!');
    return;
  }

  private isStoreEmpty() {
    return this.playersFromStorage == null;
  }

  private async addToStorage(players: IPlayer[]) {
    const playersToLolcalStorage = {
      lastUpdateDay: DateHelper.GetLastUpdateThursday(),
      players: players,
    } as IPlayersData;

    await SavePlayersToStorageViaMassage(playersToLolcalStorage);
  }

  private shouldUpdateStorage(lastUpdateDayFromLocalStorage: Date) {
    const lastUpdateDate = new Date(lastUpdateDayFromLocalStorage);
    // console.log(`from storage: ${lastUpdateDayFromLocalStorage}`);
    // console.log(`converted from storage: ${lastUpdateDate}`);

    const now = new Date();
    now.setHours(12, 0, 0, 0);

    const diff = now.getTime() - lastUpdateDate.getTime();
    const daysToUpdate = new Date(WEEK_IN_MILISECONDS - diff).getDate() - 1;
    console.log('Days to update: ' + daysToUpdate);

    // czy minal tydzien od ostatniego update'u - czy kolejny czwartek po updatcie
    return WEEK_IN_MILISECONDS - diff <= 0;
  }

  private async updateAllPlayers(playersStatsFromPage: IPlayer[], dataFromStorage: IPlayersData) {
    const temporaryPlayers: IPlayer[] = [];
    const playersFromStorage = dataFromStorage.players;
    let playerStatsFromStorage;

    for (const playerFromPage of playersStatsFromPage) {
      playerStatsFromStorage = this.getPlayerByName(playerFromPage.name, playersFromStorage);
      if (playerStatsFromStorage) {
        playerStatsFromStorage.updatePlayerStatistic(playerFromPage);
        temporaryPlayers.push(playerStatsFromStorage);
      } else {
        console.log(playerFromPage.name + ' do not exists in Storage!');
        temporaryPlayers.push(playerFromPage);
      }
    }

    return await this.addToStorage(temporaryPlayers);
  }

  private getPlayerByName(playerName: string, playersFromStorage: IPlayer[]): Player | undefined {
    const foundPlayer = playersFromStorage.find((player) => player.name == playerName);
    if (foundPlayer) {
      return new Player(foundPlayer);
    }

    return undefined;
  }
}
