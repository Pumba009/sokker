import { TableManager } from '../managers/table_manager';
import { loadPlayerStatsFromStorage } from '../utils/storage_helper';
import { getPlayerNameFromPage } from '../utils/player_helper';

async function renderTrainingPlayerReport() {
  const playerName = getPlayerNameFromPage();
  const player = await loadPlayerStatsFromStorage(playerName);
  // if (!player) {
  //   console.log(`${playerName} nie istnieje w storage.`);
  //   return;
  // }

  const tableManager = new TableManager(player);
  tableManager.createTable();
}

//mozna zoptymalizowac, nalezaloby poczekac az strona zawodnika sie zaladuje a doopiero potem renderowac raport
//(pobieranie z storage statystyk najwyrazniej trwa tyle ze wystarczy)
renderTrainingPlayerReport();
