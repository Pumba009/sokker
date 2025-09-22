import { TableManager } from '../managers/table_manager';
import { LoadPlayerByNameFromStorage } from '../utils/storage_helper';
import { GetPlayerNameFromPage } from '../utils/player_helper';

function redirectToPlayerPage(url: string) {
  url = window.location.href;
  const playerId = url.split('/')[7];
  const playerPageUrl = `https://sokker.org/player/PID/${playerId}`;
  window.location.href = playerPageUrl;
}

async function drawChart() {
  const playerName = GetPlayerNameFromPage();
  const player = await LoadPlayerByNameFromStorage(playerName);
  if (!player) {
    console.log(`${playerName} nie istnieje w storage.`);
    return;
  }

  const tableManager = new TableManager(player);
  tableManager.CreateTable();
}

async function start() {
  const playerInfoUrl = 'https://sokker.org/pl/app/training/player-info/';
  const url = window.location.href;
  if (url.startsWith(playerInfoUrl)) {
    return redirectToPlayerPage(url);
  }

  return await drawChart();
}

start();

// const player = await getPlayers();
// const tableManager = new TableManager<IPlayer>(player);
// tableManager.CreateChart();

//function waitForTableIsBuiltThenGetPlayersStats() {
//   waitForElement('.table__root', async (elem: HTMLElement) => {
//     console.log('element is ready');
//     const tbody = elem.querySelector("tbody") as HTMLTableSectionElement | null;
//     if(!tbody){
//       console.log('tbody not find!');
//       return;
//     }
//     await getStatsAndUpdateStorage(tbody);
//   });

//   function waitForElement(selector: string, callback: any) {
//     const target = document.querySelector(selector);
//     if (target) {
//       sleep(500); //dodałem bo dopiero za 5 razem F5 zapisuje do chrome.storage
//       callback(target);
//       return;
//     }

//     const observer = new MutationObserver((mutations, obs) => {
//       const element = document.querySelector(selector);
//       if (element) {
//         obs.disconnect();
//         sleep(500); //dodałem bo dopiero za 3-4 refreshem zapisuje do chrome.storage
//         callback(element);
//       }
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });
//   }

//     async function sleep(ms: number): Promise<void> {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }
// }

// window.addEventListener('load', () => {
//   waitForTableIsBuiltThenGetPlayersStats();
// });
