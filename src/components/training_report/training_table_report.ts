import { IPlayerDetails } from '../../types/interfaces';
import { playerSkillNameMapper, playerProgressTableHeaders } from '../../constants';

export class TrainingTableReport<T extends IPlayerDetails> implements ITrainingReport {
  private _playerData: T;

  public constructor(playerDetails: T) {
    this._playerData = playerDetails;
  }

  public renderTrainingReportOnPage() {
    this.createTable();
  }

  public deleteReport() {
    const element = document.querySelector('.layout__main') as HTMLElement | null;
    element?.remove();
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

    //thead
    const thead: HTMLTableSectionElement = tableRoot.createTHead();
    const rowThead: HTMLTableRowElement = thead.insertRow();
    rowThead.appendChild(this.addHead({ key: 'data', value: 'data' }));
    playerProgressTableHeaders.forEach((headerName) => {
      rowThead.appendChild(this.addHead(headerName));
    });

    //tbody
    const tbody: HTMLTableSectionElement = tableRoot.createTBody();
    let index = this._playerData.trainingHistory.length - 1;
    const playersTraningHistory = [...this._playerData.trainingHistory].reverse();
    playersTraningHistory.forEach((trainingHistory) => {
      const rowTbody: HTMLTableRowElement = tbody.insertRow();
      this.addFirstCell(rowTbody, trainingHistory.updateDateTime.split('T')[0]);
      playerSkillNameMapper.forEach((skillNameMapper) => {
        this.addSkillsCell(
          rowTbody,
          skillNameMapper.value,
          trainingHistory.playerStats[skillNameMapper.key].toString(),
          index,
        );
      });
      index--;
      console.log(trainingHistory);
      this.addTrainingDetailCell(
        rowTbody,
        'trainingType',
        trainingHistory.trainingDetails?.trainingType,
      );
      this.addTrainingDetailCell(
        rowTbody,
        'effectivePercentage',
        trainingHistory.trainingDetails?.effectivePercentage,
      );
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

  private addSkillsCell(
    row: HTMLTableRowElement,
    playerSkillName: string,
    playerSkillValue: string,
    index: number,
  ) {
    const cell: HTMLTableCellElement = row.insertCell();
    cell.className = `table__cell table__cell--${playerSkillName}`;
    const wrapedDiv = document.createElement('div');
    wrapedDiv.className = 'table__cell-wrap table__cell-wrap--border-left';
    const span = document.createElement('span');
    const wrapedSpan = document.createElement('span');
    wrapedSpan.className = this.colorCell(playerSkillName, playerSkillValue, index);
    wrapedSpan.textContent = playerSkillValue;

    span.appendChild(wrapedSpan);
    wrapedDiv.appendChild(span);
    cell.appendChild(wrapedDiv);
  }

  private colorCell(playerSkillName: string, playerSkillValue: string, index: number): string {
    index = index - 1;
    if (index <= 0) {
      return 'growth-bg';
    }

    const lastWeekPlayerTraining = this._playerData.trainingHistory[index].playerStats;
    const skillName = playerSkillNameMapper.find((kv) => kv.value == playerSkillName)!.key; //[playerAttributeName as keyof IPlayerAtributes];

    const lastWeekSkillValue = lastWeekPlayerTraining[skillName];
    const playerSkillValueNum = Number(playerSkillValue);

    if (lastWeekSkillValue == playerSkillValueNum) return 'growth-bg';

    if (lastWeekSkillValue < playerSkillValueNum) return 'growth-bg growth-bg--up';

    return 'growth-bg growth-bg--down';
  }

  private addTrainingDetailCell(row: HTMLTableRowElement, description: string, value: string) {
    const cell: HTMLTableCellElement = row.insertCell();
    cell.className = `table__cell table__cell--${description}`;
    const wrapedDiv = document.createElement('div');
    wrapedDiv.className = 'table__cell-wrap table__cell-wrap--border-left';
    const span = document.createElement('span');
    const wrapedSpan = document.createElement('span');
    wrapedSpan.className = 'growth-bg';
    wrapedSpan.textContent = value;

    span.appendChild(wrapedSpan);
    wrapedDiv.appendChild(span);
    cell.appendChild(wrapedDiv);
  }
}
