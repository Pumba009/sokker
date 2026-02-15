import { ReportType } from './model/raport_type';
import { IPlayer } from '../../types/interfaces';
import { playerAttributesShortName, playerAttributesMapper } from '../../constants';

export class TrainingTableReport<T extends IPlayer> {
  private _playerData: T;

  public constructor(playerProgressHistory: T) {
    this._playerData = playerProgressHistory;
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
    tableDiv.className = 'is-sticky';
    tableRoot.className = 'table__root';

    const thead: HTMLTableSectionElement = tableRoot.createTHead();
    const row: HTMLTableRowElement = thead.insertRow();
    row.appendChild(this.addHead({ key: 'data', value: 'data' }));
    playerAttributesShortName.forEach((playerAttributeKeyValuePair) => {
      row.appendChild(this.addHead(playerAttributeKeyValuePair));
    });

    const tbody: HTMLTableSectionElement = tableRoot.createTBody();
    let weekIndex = this._playerData.progressHistory.length - 1;
    for (weekIndex; weekIndex >= 0; weekIndex--) {
      const row: HTMLTableRowElement = tbody.insertRow();
      this.addFirstCell(row, this._playerData.updateDateTime[weekIndex].split('T')[0]);

      const playerStats = this._playerData.progressHistory[weekIndex];
      playerAttributesMapper.forEach((playerAttributesMapper) => {
        this.addCell(
          row,
          playerAttributesMapper.value,
          playerStats[playerAttributesMapper.key].toString(),
          weekIndex,
        );
      });
    }

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
    th.className = `table__th table__th--${attribute.key} is-sortable`;
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

  private addFirstCell(row: HTMLTableRowElement, datetime: string) {
    const cell: HTMLTableCellElement = row.insertCell();
    cell.className = `table__cell table__cell--date-time`;
    const wrapedDiv = document.createElement('div');
    wrapedDiv.className = 'table__cell-wrap table__cell-wrap--border-left';
    const span = document.createElement('span');
    const wrapedSpan = document.createElement('span');
    wrapedSpan.className = 'growth-bg';
    wrapedSpan.textContent = datetime;

    span.appendChild(wrapedSpan);
    wrapedDiv.appendChild(span);
    cell.appendChild(wrapedDiv);
  }

  private addCell(
    row: HTMLTableRowElement,
    playerAttributeName: string,
    playerAttributeValue: string,
    index: number,
  ) {
    const cell: HTMLTableCellElement = row.insertCell();
    cell.className = `table__cell table__cell--${playerAttributeName}`;
    const wrapedDiv = document.createElement('div');
    wrapedDiv.className = 'table__cell-wrap table__cell-wrap--border-left';
    const span = document.createElement('span');
    const wrapedSpan = document.createElement('span');
    wrapedSpan.className = this.colorCell(playerAttributeName, playerAttributeValue, index);
    wrapedSpan.textContent = playerAttributeValue;

    span.appendChild(wrapedSpan);
    wrapedDiv.appendChild(span);
    cell.appendChild(wrapedDiv);
  }

  private colorCell(
    playerAttributeName: string,
    playerAttributeValue: string,
    index: number,
  ): string {
    index = index - 1;
    if (index <= 0) {
      return 'growth-bg';
    }

    const lastWeekPlayerAttributes = this._playerData.progressHistory[index];
    const attribute = playerAttributesMapper.find((kv) => kv.value == playerAttributeName)!.key; //[playerAttributeName as keyof IPlayerStats];
    const lastWeekAttributeValue = lastWeekPlayerAttributes[attribute];

    const playerAttributeValueNum = Number(playerAttributeValue);
    if (lastWeekAttributeValue == playerAttributeValueNum) {
      return 'growth-bg';
    }

    if (lastWeekAttributeValue < playerAttributeValueNum) {
      return 'growth-bg growth-bg--up';
    }

    return 'growth-bg growth-bg--down';
  }
}
