import { IPlayerDetails, ITrainingHistory, IPlayersPage } from './interfaces';
import { DateHelper } from '../utils/date_helper';

export class Player implements IPlayerDetails {
  id!: string;
  name!: string;
  trainingHistory!: ITrainingHistory[];

  constructor(init?: IPlayerDetails) {
    if (init) {
      Object.assign(this, init);
      //Object.assign kopiuje wszystkie pola z obiektu IPlayerDetails do instancji Player.
    }
  }

  updatePlayerTrainingHistory(playerFromPage: IPlayersPage): this {
    this.id = playerFromPage.id;
    this.name = playerFromPage.name;
    const trainingHistory: ITrainingHistory = {
      updateDateTime: DateHelper.getUpdateThursday(),
      playerStats: playerFromPage.playerStats,
      trainingDetails: playerFromPage.trainingDetails,
    };
    if (this.trainingHistory) {
      this.trainingHistory.push(trainingHistory);
    } else {
      this.trainingHistory = [trainingHistory];
    }
    return this;
  }
}
