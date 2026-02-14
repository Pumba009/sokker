import { PlayerHelper } from '../utils/player_helper';
import { IPlayer } from '../types/interfaces';
import { TrainingChartReport } from '../components/training_chart_report';
import { TrainingTableReport } from '../components/training_report/training_table_report';

export class ChartManager<T extends IPlayer> {
  private _data: T;
  private _trainingChartReport: TrainingChartReport;
  private _trainingTableReport: TrainingTableReport<T>;

  constructor(data: T) {
    this._data = data;
    this._trainingChartReport = new TrainingChartReport();
    this._trainingTableReport = new TrainingTableReport(data);
  }

  public createChart() {
    // const playersStats = this.getPlayerStatsByAttribute('1'); // 1 = kondycja
    // this._trainingChartReport.createChart(playersStats);
    this._trainingTableReport.renderTrainingReportOnPage();
  }

  public populateChart(playerAttributeId: string, labelName: string) {
    const playerStats = this.getPlayerStatsByAttribute(playerAttributeId);
    this._trainingChartReport.updateChart(labelName, playerStats);
  }

  private getPlayerStatsByAttribute(playerAttributeInNumber: string): {
    xValues: string[];
    yValues: number[];
  } {
    const playerAttribute = PlayerHelper.decodePlayerAttribute(playerAttributeInNumber);
    const xValues: string[] = this._data.updateDateTime.map((date) =>
      new Date(date).toLocaleDateString(),
    );
    const yValues: number[] = this._data.progressHistory.flatMap((stat) => stat[playerAttribute]);
    //this._data.progressHistory.flatMap((stat) => console.log(stat));

    return { xValues, yValues };
  }
}
