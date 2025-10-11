import { IPlayer } from '../../types/interfaces';

export interface IStorageManager {
  UpdateRaport(playersFromPage: IPlayer[]): void;
}
