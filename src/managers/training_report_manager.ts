import { ReportView } from '../constants';
import { IPlayerDetails } from '../types/interfaces';
import { TrainingChartReport } from '../components/training_report/training_chart_report';
import { TrainingTableReport } from '../components/training_report/training_table_report';

export class TrainigReportManager<T extends IPlayerDetails> {
    private _playerData: T;
    private _trainingReporot: ITrainingReport;

    constructor(data: T) {
        this._playerData = data;
        this._trainingReporot = new TrainingTableReport(this._playerData);
    }

    public renderReport(reportView: ReportView) {
        if (this._trainingReporot) {
            this._trainingReporot.deleteReport();
        }

        switch (reportView) {
            case ReportView.Table:
                this._trainingReporot = new TrainingTableReport(this._playerData);
                break;
            case ReportView.Chart:
                this._trainingReporot = new TrainingChartReport(this._playerData);
                break;
        }

        this._trainingReporot.renderTrainingReportOnPage();

        return;
    }
}
