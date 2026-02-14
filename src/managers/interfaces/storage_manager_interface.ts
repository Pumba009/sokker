import { IPlayer } from '../../types/interfaces';

export interface IStorageManager {
  updateRaport(playersFromPage: IPlayer[]): void;
}
