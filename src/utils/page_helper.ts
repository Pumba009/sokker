import { IPlayerStats, IPlayer } from '../types/interfaces';
import { DateHelper } from '../utils/date_helper';

export class PageHelper {
  static GetPlayersStatsFromPage(tableRows: HTMLElement): IPlayer[] {
    const players: IPlayer[] = [];

    const rows = tableRows.querySelectorAll<HTMLTableRowElement>('tr.table-row');
    rows.forEach((row) => {
      players.push(this.GetPlayersSkillsFromPage(row));
    });

    return players;
  }

  private static GetPlayersSkillsFromPage(tableRow: HTMLTableRowElement): IPlayer {
    const player_name = getPlayersName(tableRow);

    const stats: IPlayerStats = {
      stamina_num: getPlayersData(tableRow.cells[6]), //stamina_num
      speed_num: getPlayersData(tableRow.cells[7]), //speed_num
      technique_num: getPlayersData(tableRow.cells[8]), //technique_num
      pass_num: getPlayersData(tableRow.cells[9]), //pass_num
      keeper_num: getPlayersData(tableRow.cells[10]), //keeper_num
      defense_num: getPlayersData(tableRow.cells[11]), //defense_num
      playmaker_num: getPlayersData(tableRow.cells[12]), //playmaker_num
      striker_num: getPlayersData(tableRow.cells[13]), //striker_num
    };

    return {
      id: tableRow.dataset.rowId ?? '',
      name: player_name,
      updateDateTime: [DateHelper.GetUpdateThursday()],
      progressHistory: [stats],
    } as IPlayer;

    function getPlayersData(cell: HTMLTableCellElement): number {
      const player_data = parseInt(cell?.childNodes[0]?.childNodes[0]?.textContent ?? '');
      if (isNaN(player_data)) {
        console.log(
          `Bład podczas parsowania umiejetnosci zawodnika: ${player_name}, value: ${cell?.childNodes[0]?.childNodes[0]?.textContent}`,
        );
      }
      return player_data;
    }

    function getPlayersName(tableRow: HTMLTableRowElement) {
      const anchor = tableRow.cells[1]?.querySelector('a'); //cells[0] - flaga,  cells[1] - name;
      const playerName = anchor?.textContent?.trim();
      return playerName;
    }
  }
}
