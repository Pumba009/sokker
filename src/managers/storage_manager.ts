import { IPlayer, IPlayersData } from '../types/interfaces';
import { Player } from '../types/player';
import { DateHelper } from '../utils/date_helper';
import {
  loadPlayersStatsFromStorageViaMassage,
  savePlayersStatsToStorageViaMassage,
} from '../utils/storage_helper';
import { IStorageManager } from './interfaces/storage_manager_interface';

export class StorageManager implements IStorageManager {
  private _playersFromStorage: IPlayersData;

  constructor(players: IPlayersData) {
    this._playersFromStorage = players;
  }

  static async create() {
    const players = await loadPlayersStatsFromStorageViaMassage();
    return new StorageManager(players);
  }

  public async updateRaport(playersFromPage: IPlayer[]) {
    if (this._playersFromStorage == null) {
      console.log('Storage is empty. Adding players to storage for the First Time!');
      return await this.addToStorage(playersFromPage);
    }

    if (DateHelper.shouldUpdateStorage(this._playersFromStorage.lastUpdateDay)) {
      console.log('It is update day!');
      return await this.updateAllPlayers(playersFromPage, this._playersFromStorage);
    }

    console.log('It is not update day!');
    return;
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

  private async addToStorage(players: IPlayer[]) {
    const playersToLolcalStorage = {
      lastUpdateDay: DateHelper.getUpdateThursday(),
      players: players,
    } as IPlayersData;

    await savePlayersStatsToStorageViaMassage(playersToLolcalStorage);
  }

  private getPlayerByName(playerName: string, playersFromStorage: IPlayer[]): Player | undefined {
    const foundPlayer = playersFromStorage.find((player) => player.name == playerName);
    if (foundPlayer) {
      return new Player(foundPlayer);
    }

    return undefined;
  }
}
