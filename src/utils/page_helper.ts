import { IPlayerStats, IPlayer } from '../types/interfaces';
import { DateHelper } from '../utils/date_helper';

export class PageHelper {
  static GetPlayersStatsFromPage(tableRows: HTMLTableSectionElement): IPlayer[] {
    const players: IPlayer[] = [];

    const rows = tableRows.querySelectorAll<HTMLTableRowElement>('tr.table-row');
    rows.forEach((row) => {
      players.push(this.GetPlayersSkillsFromPage(row));
    });

    return players;
  }

  private static GetPlayersSkillsFromPage(tableRow: HTMLTableRowElement): IPlayer {
    const stats: IPlayerStats = {
      stamina_num: this.getPlayersData(tableRow.cells[6]), //stamina_num
      speed_num: this.getPlayersData(tableRow.cells[7]), //speed_num
      technique_num: this.getPlayersData(tableRow.cells[8]), //technique_num
      pass_num: this.getPlayersData(tableRow.cells[9]), //pass_num
      keeper_num: this.getPlayersData(tableRow.cells[10]), //keeper_num
      defense_num: this.getPlayersData(tableRow.cells[11]), //defense_num
      playmaker_num: this.getPlayersData(tableRow.cells[12]), //playmaker_num
      striker_num: this.getPlayersData(tableRow.cells[13]), //striker_num
    };

    return {
      id: tableRow.dataset.rowId ?? '',
      name: this.getPlayersName(tableRow),
      updateDateTime: [DateHelper.GetLastUpdateThursday()],
      progressHistory: [stats],
    } as IPlayer;
  }

  private static getPlayersData(cell: any) {
    return cell?.childNodes[0]?.childNodes[0]?.textContent;
  }

  private static getPlayersName(tableRow: any) {
    const div = tableRow.cells[1]?.childNodes[0]; // cells[0] - flaga,  cells[1] - name;
    if (div.childElementCount != 0) {
      //div -> span -> a.text. Tylko nazwisko bo ma linka
      return div.childNodes[0]?.childNodes[0]?.text;
    }
    return null;
  }
}
