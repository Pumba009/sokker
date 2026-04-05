import { ReportView } from '../constants';
import { IPlayerDetails } from '../types/interfaces';
import { TrainingChartReport } from '../components/training_report/training_chart_report';
import { TrainingTableReport } from '../components/training_report/training_table_report';

export class TrainigReportManager<T extends IPlayerDetails> {
  private _trainingChartReport: TrainingChartReport<T>;
  private _trainingTableReport: TrainingTableReport<T>;

  constructor(data: T) {
    this._trainingChartReport = new TrainingChartReport(data);
    this._trainingTableReport = new TrainingTableReport(data);
  }

  public renderReport(reportView: ReportView) {
    this._trainingTableReport.deleteReport();
    this._trainingChartReport.deleteReport();

    if (reportView == ReportView.Table) {
      return this._trainingTableReport.renderTrainingReportOnPage();
    }

    return this._trainingChartReport.renderTrainingReportOnPage();
  }
}
