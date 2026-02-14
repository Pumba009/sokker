import { ReportType } from './model/raport_type';
import { IPlayer } from '../../types/interfaces';
import { playerAttributesShortName, playerAttributesMapper } from '../../constants';

export class TrainingTableReport<T extends IPlayer> {
  private _data: T;

  public constructor(data: T) {
    this._data = data;
  }

  public renderTrainingReportOnPage(raportType: ReportType = ReportType.Table) {
    console.log(raportType);
    this.createTable();
  }

  private createTable() {
    const layoutMainDiv = document.createElement('div');
    const mtpDiv = document.createElement('div');
    const trainingDiv = document.createElement('div');
    const tableDiv = document.createElement('div');
    const tableRoot = document.createElement('table');

    layoutMainDiv.className = 'layout__main';
    mtpDiv.className = 'mtp-tab__table';
    trainingDiv.className = 'training-table';
    tableDiv.className = 'table is-sticky';
    tableRoot.className = 'table__root';

    console.log(this._data);

    const thead: HTMLTableSectionElement = tableRoot.createTHead();
    thead.appendChild(this.addHead({ key: 'data', value: 'data' }));
    playerAttributesShortName.forEach((playerAttributeKeyValuePair) => {
      thead.appendChild(this.addHead(playerAttributeKeyValuePair));
    });

    let i = this._data.progressHistory.length - 1;
    this._data.progressHistory.reverse().forEach((playerStats) => {
      const row: HTMLTableRowElement = tableRoot.insertRow();
      this.addCell(row, 'data', this._data.updateDateTime[i].split('T')[0]);
      i--;

      playerAttributesMapper.forEach((playerAttributesMapper) => {
        this.addCell(
          row,
          playerAttributesMapper.value,
          playerStats[playerAttributesMapper.key].toString(),
        );
      });
    });

    tableDiv.appendChild(tableRoot);
    trainingDiv.appendChild(tableDiv);
    mtpDiv.appendChild(trainingDiv);
    layoutMainDiv.appendChild(trainingDiv);

    const divOnPage = document.getElementsByClassName('l-main__inner')[0];
    divOnPage.appendChild(layoutMainDiv);
  }

  private addHead(attribute: { key: string; value: string }): HTMLTableCellElement {
    const th: HTMLTableCellElement = document.createElement('th');
    //const cell: HTMLTableCellElement = thead.insertCell();
    th.className = `table__th table__th--${attribute.key} is-sortable is-sticky`;
    const wrapedDiv = document.createElement('div');
    wrapedDiv.className = 'table__th-wrap';
    const dataDiv = document.createElement('div');
    dataDiv.setAttribute('data-tip', 'true');
    dataDiv.setAttribute('data-for', 'tooltip-10');
    dataDiv.setAttribute('currentitem', 'false');

    const dataParagraph = document.createElement('p');
    dataParagraph.className = 'tooltip-cell';
    dataParagraph.textContent = attribute.value;

    dataDiv.appendChild(dataParagraph);
    wrapedDiv.appendChild(dataDiv);
    th.appendChild(wrapedDiv);
    return th;
  }

  private addCell(
    row: HTMLTableRowElement,
    playerAttributeName: string,
    playerAttributeValue: string,
  ) {
    const cell: HTMLTableCellElement = row.insertCell();
    cell.className = `table__cell table__cell--${playerAttributeName}`;
    const wrapedDiv = document.createElement('div');
    wrapedDiv.className = 'table__cell-wrap table__cell-wrap--border-left';
    const span = document.createElement('span');
    const wrapedSpan = document.createElement('span');
    wrapedSpan.className = 'growth-bg';
    wrapedSpan.textContent = playerAttributeValue;

    span.appendChild(wrapedSpan);
    wrapedDiv.appendChild(span);
    cell.appendChild(wrapedDiv);
  }
}

//table.style.border = "1px solid black" i cell.style.padding = "4px"

// data.forEach((rowData) => {
//   const row: HTMLTableRowElement = tableRoot.insertRow();
//   rowData.forEach((cellData) => {
//     const cell: HTMLTableCellElement = row.insertCell();
//     cell.textContent = cellData;
//   });
// });

//growth-bg--up
//growth-bg--down
