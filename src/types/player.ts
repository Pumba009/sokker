import { IPlayer, IPlayerStats } from './interfaces';

export class Player implements IPlayer {
  id!: string;
  name!: string;
  updateDateTime!: Date[];
  progressHistory!: IPlayerStats[];

  constructor(init: IPlayer) {
    Object.assign(this, init);
    //Object.assign kopiuje wszystkie pola z obiektu IPlayer do instancji Player.
  }

  updatePlayerStatistic(playerFromPage: IPlayer): this {
    this.updateDateTime.push(playerFromPage.updateDateTime[0]); //player.updateDateTime.length-1
    this.progressHistory.push(playerFromPage.progressHistory[0]); //player.progressHistory.length-1
    this.id = playerFromPage.id;
    return this;
  }
}
