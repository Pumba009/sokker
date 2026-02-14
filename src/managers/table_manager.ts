import { ChartManager } from './chart_manager';
import { playerAttributes } from '../constants';
import { IPlayer } from '../types/interfaces';

export class TableManager<T extends IPlayer> {
  private _data: IPlayer;
  private _chartManager: ChartManager<IPlayer>;

  constructor(data: T) {
    this._data = data;
    this._chartManager = new ChartManager(this._data);
  }

  public createTable() {
    //this.createDropListOfPlayerAtrributes();
    this._chartManager.createChart();
  }

  private createDropListOfPlayerAtrributes() {
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
      this._chartManager.populateChart(
        target.value,
        target.options[parseInt(target.value) - 1].text,
      );
    };

    playerAttributes.forEach((attribute) => {
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
}
