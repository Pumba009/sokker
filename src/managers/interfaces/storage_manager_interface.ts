import { IPlayersPage } from '../../types/interfaces';

export interface IStorageManager {
  updateRaport(playersFromPage: IPlayersPage[]): void;
}
