import { IPlayerDetails } from '../../types/interfaces';
import { Table } from '../others/html_table_creator';
import { playerSkillNameMapper, trainingReportTableHeaders as trainingReportTableHeaders } from '../../constants';

export class TrainingTableReport<T extends IPlayerDetails> implements ITrainingReport {
    private _playerData: T;

    public constructor(playerDetails: T) {
        this._playerData = playerDetails;
    }

    public renderTrainingReportOnPage() {
        const table = Table.createTable();
        Table.addTableHeader(table, trainingReportTableHeaders);
        this.addTableBody(table);
    }

    public deleteReport() {
        const element = document.querySelector('.layout__main') as HTMLElement | null;
        element?.remove();
    }

    private addTableBody(tableRoot: HTMLTableElement) {
        //tbody
        const tbody: HTMLTableSectionElement = tableRoot.createTBody();

        let index = this._playerData.trainingHistory.length - 1;
        const playersTraningHistory = [...this._playerData.trainingHistory].reverse();
        playersTraningHistory.forEach((trainingHistory) => {
            const row: HTMLTableRowElement = tbody.insertRow();
            Table.addCellToRow(row, 'date-time', trainingHistory.updateDateTime.split('T')[0]);
            playerSkillNameMapper.forEach((skillNameMapper) => {
                const skillName = skillNameMapper.value;
                const skillValue = trainingHistory.playerStats[skillNameMapper.key].toString();
                const color = this.colorCell(skillName, skillValue, index);
                Table.addCellToRowWithColor(row, skillName, skillValue, color);
            });
            index--;
            Table.addCellToRow(row, 'trainingType', trainingHistory.trainingDetails?.trainingType);
            Table.addCellToRow(row, 'effectivePercentage', trainingHistory.trainingDetails?.effectivePercentage);
        });
    }

    private colorCell(playerSkillName: string, playerSkillValue: string, index: number): string {
        index = index - 1;
        if (index < 0) {
            return 'growth-bg';
        }

        const lastWeekPlayerTraining = this._playerData.trainingHistory[index].playerStats;
        const skillName = playerSkillNameMapper.find((kv) => kv.value == playerSkillName)!.key; //[playerAttributeName as keyof IPlayerAtributes];

        const lastWeekSkillValue = lastWeekPlayerTraining[skillName];
        const playerSkillValueNum = Number(playerSkillValue);

        if (lastWeekSkillValue == playerSkillValueNum) {
            return 'growth-bg';
        }

        if (lastWeekSkillValue < playerSkillValueNum) {
            return 'growth-bg growth-bg--up';
        }

        return 'growth-bg growth-bg--down';
    }
}
