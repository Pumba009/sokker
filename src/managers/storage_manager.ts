import { IPlayer, IPlayersData } from '../types/interfaces';
import { Player } from '../types/player';
import { DateHelper } from '../utils/date_helper';
import {
  LoadPlayersFromStorageViaMassage,
  SavePlayersToStorageViaMassage,
} from '../utils/storage_helper';
import { IStorageManager } from './interfaces/storage_manager_interface';

export class StorageManager implements IStorageManager {
  private playersFromStorage: IPlayersData;

  constructor(players: IPlayersData) {
    this.playersFromStorage = players;
  }

  static async Create() {
    const players = await LoadPlayersFromStorageViaMassage();
    return new StorageManager(players);
  }

  public async UpdateRaport(playersFromPage: IPlayer[]) {
    if (this.playersFromStorage == null) {
      console.log('Storage is empty. Adding players to storage for the First Time!');
      return await this.addToStorage(playersFromPage);
    }

    if (DateHelper.ShouldUpdateStorage(this.playersFromStorage.lastUpdateDay)) {
      console.log('It is update day!');
      return await this.updateAllPlayers(playersFromPage, this.playersFromStorage);
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
      lastUpdateDay: DateHelper.GetUpdateThursday(),
      players: players,
    } as IPlayersData;

    await SavePlayersToStorageViaMassage(playersToLolcalStorage);
  }

  private getPlayerByName(playerName: string, playersFromStorage: IPlayer[]): Player | undefined {
    const foundPlayer = playersFromStorage.find((player) => player.name == playerName);
    if (foundPlayer) {
      return new Player(foundPlayer);
    }

    return undefined;
  }
}
