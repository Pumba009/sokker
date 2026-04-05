import { TrainigReportManager } from '../managers/training_report_manager';
import { loadPlayerStatsFromStorage, convertStorageData } from '../utils/storage_helper';
import { getPlayerNameFromPage } from '../utils/player_helper';
import { ReportView } from '../constants';
import { createReportSelector } from '../components/others/report_selector';

async function renderTrainingPlayerReport() {
  // convertuje player data usuwa liste updateHistory i progressHistory a zastepouje 1 lista trainingHistory
  await convertStorageData();

  const playerName = getPlayerNameFromPage();
  const player = await loadPlayerStatsFromStorage(playerName);
  const manager = new TrainigReportManager(player);

  createReportSelector((rv) => manager.renderReport(rv));
  manager.renderReport(ReportView.Table); // default report
}

//mozna zoptymalizowac, nalezaloby poczekac az strona zawodnika sie zaladuje a doopiero potem renderowac raport
//(pobieranie statystyk zawdonika ze chrome.storage trwa tyle ze najwyrazniej nie trzeba optymalizowac renderowania raportu)
renderTrainingPlayerReport();
