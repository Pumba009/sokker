import { Chart, ChartConfiguration } from 'chart.js/auto'; // auto - rejestruje wszystko chyba tak samo jak Chart.register(...registerables)
//import { Chart, ChartConfiguration, registerables} from "chart.js";
//Chart.register(...registerables); // rejestracja lini, punktow, skali (nowe rozwiazanie w chart.js od wersji 2.0 lub 3.0 - terefere)

export class TrainingChartReport {
  private _chartName = 'Training Skills Report';
  private _chart: Chart | null = null;

  public createChart(playerData: { xValues: string[]; yValues: number[] }) {
    const config = this.getInitialChartConfig(playerData);
    const ctx = this.createEmptyCanvas();
    if (!ctx) {
      console.log('Nie znaleziono Canvas');
    }

    this._chart = new Chart(ctx, config);
  }

  private createEmptyCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const div = document.createElement('div');
    const divRow = document.createElement('div');
    const divPanel = document.createElement('div');
    const mainDiv = document.getElementsByClassName('l-main__inner')[0];

    canvas.id = this._chartName;
    div.id = 'chartContainer';
    divRow.id = 'myRow';
    divRow.className = 'col-md-12 col-sm-12 col-xs-12';
    divRow.style.height = 'auto';
    divPanel.className = 'panel panel-default';
    divPanel.id = 'myPanel';

    div.appendChild(canvas);
    divPanel.appendChild(div);
    divRow.appendChild(divPanel);
    mainDiv.appendChild(divRow);

    return canvas;
  }

  private getInitialChartConfig(playerData: {
    xValues: string[];
    yValues: number[];
  }): ChartConfiguration {
    return {
      type: 'line',
      data: {
        labels: playerData.xValues,
        datasets: [
          {
            fill: false,
            label: 'Kondycja',
            data: playerData.yValues,
            backgroundColor: 'rgba(255,255,255,1.0)',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 20,
          },
        },
      },
    } as ChartConfiguration;
  }

  public updateChart(labelName: string, playerData: { xValues: string[]; yValues: number[] }) {
    if (this._chart) {
      this._chart.data.datasets[0].label = labelName;
      this._chart.data.datasets[0].data = playerData.yValues;
      this._chart.update();
    }
  }
}

//   private testData() {
//     const tempSkills = [
//       { stamina_num: '1', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '2', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '3', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '4', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '5', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '6', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '7', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '8', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '9', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '10', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '11', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '12', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '13', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '14', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '15', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '16', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '17', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '18', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '17', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '16', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '15', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '14', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '13', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '12', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '11', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '10', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '9', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '8', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '7', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '6', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '5', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '4', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '3', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '2', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '1', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//       { stamina_num: '0', speed_num: '7', technique_num: '5', pass_num: '4', keeper_num: '0' },
//     ];

//     const tempDate = [
//       '2023-07-29T12:16:17.736Z',
//       '2023-07-30T12:16:17.736Z',
//       '2023-07-31T12:16:17.736Z',
//       '2023-08-00T12:16:17.736Z',
//       '2023-08-01T12:16:17.736Z',
//       '2023-08-02T12:16:17.736Z',
//       '2023-08-03T12:16:17.736Z',
//       '2023-08-04T12:16:17.736Z',
//       '2023-08-05T12:16:17.736Z',
//       '2023-08-06T12:16:17.736Z',
//       '2023-07-08T12:16:17.736Z',
//       '2023-08-08T12:16:17.736Z',
//       '2023-08-09T12:16:17.736Z',
//       '2023-08-10T12:16:17.736Z',
//       '2023-08-11T12:16:17.736Z',
//       '2023-08-12T12:16:17.736Z',
//       '2023-08-13T12:16:17.736Z',
//       '2023-08-14T12:16:17.736Z',
//       '2023-08-15T12:16:17.736Z',
//       '2023-08-16T12:16:17.736Z',
//       '2023-08-17T12:16:17.736Z',
//       '2023-08-18T12:16:17.736Z',
//       '2023-08-19T12:16:17.736Z',
//       '2023-08-20T12:16:17.736Z',
//       '2023-08-21T12:16:17.736Z',
//       '2023-08-23T22:16:17.736Z',
//       '2023-08-24T12:16:17.736Z',
//       '2023-08-25T12:16:17.736Z',
//       '2023-08-26T12:16:17.736Z',
//       '2023-08-27T12:16:17.736Z',
//       '2023-08-28T12:16:17.736Z',
//       '2023-08-29T12:16:17.736Z',
//       '2023-08-30T12:16:17.736Z',
//       '2023-08-31T12:16:17.736Z',
//       '2023-08-32T22:16:17.736Z',
//       '2023-08-33T12:16:17.736Z',
//     ];

//     return {
//       data: tempDate.map((x) => x.split('T')[0]),
//       skille: tempSkills.flatMap((x) => parseInt(x['stamina_num'])),
//     };
//   }
// }
