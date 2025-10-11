import { PlayerHelper } from '../utils/player_helper';
import { IPlayer } from '../types/interfaces';
import { MyChart } from '../components/my_chart';

export class ChartManager<T extends IPlayer> {
  private data: T;
  private myChart: MyChart;

  constructor(data: T) {
    this.data = data;
    this.myChart = new MyChart();
  }

  public CreateChart() {
    this.myChart.createChart(this.getPlayerStatsByAttribute('1'));
  }

  public PopulateChart(playerAttributeId: string, labelName: string) {
    const playerStats = this.getPlayerStatsByAttribute(playerAttributeId);
    this.myChart.UpdateChart(labelName, playerStats);
  }

  private getPlayerStatsByAttribute(playerAttributeInNumber: string): {
    xValues: string[];
    yValues: number[];
  } {
    const playerAttribute = PlayerHelper.DecodePlayerAttribute(playerAttributeInNumber);
    const xValues: string[] = this.data.updateDateTime.map((date) =>
      new Date(date).toLocaleDateString(),
    );
    const yValues: number[] = this.data.progressHistory.flatMap((stat) => stat[playerAttribute]);
    this.data.progressHistory.flatMap((stat) => console.log(stat));

    return { xValues, yValues };
  }
}
