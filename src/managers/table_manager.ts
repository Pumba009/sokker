import { ChartManager } from './chart_manager';
import { PLAYER_ATTRIBUTES } from '../constants';
import { IPlayer } from '../types/interfaces';

export class TableManager<T extends IPlayer> {
  private data: IPlayer;
  private chartManager: ChartManager<IPlayer>;

  constructor(data: T) {
    this.data = data;
    this.chartManager = new ChartManager(this.data);
  }

  public CreateTable() {
    this.CreateDropListOfPlayerAtrributes();
    this.chartManager.CreateChart();
  }

  private CreateDropListOfPlayerAtrributes() {
    const mainDiv = document.getElementsByClassName('l-main__inner')[0];
    const dropListDiv = document.createElement('div');
    dropListDiv.className = 'form-group training-set-toggle';

    const selectDiv = document.createElement('div');
    selectDiv.className = 'col-sm-7';

    const label = document.createElement('label');
    label.innerHTML = 'Wybież umiejętność: ';

    const select = document.createElement('select');
    select.className = 'panel';
    select.onchange = (event) => {
      const target = event.target as HTMLSelectElement;
      //console.log('Wartość z droplisty: ' + target.value);
      this.chartManager.PopulateChart(
        target.value,
        target.options[parseInt(target.value) - 1].text,
      );
    };

    PLAYER_ATTRIBUTES.forEach((attribute) => {
      const option = document.createElement('option');
      option.value = attribute.value.toString();
      option.text = attribute.key;
      select.appendChild(option);
    });

    selectDiv.appendChild(label);
    selectDiv.appendChild(select);
    dropListDiv.appendChild(selectDiv);
    mainDiv.appendChild(dropListDiv);
  }

  static getPlayerNameFromPage() {
    return document
      .getElementsByClassName('panel-heading')[0]
      .children[1].getElementsByTagName('a')[0].text;
  }
}
