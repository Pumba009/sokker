import { StorageManager } from '../managers/storage_manager';
import { PageHelper } from '../utils/page_helper';

console.log('Raport start');

function waitForElement(selector: string, callback: (elem: HTMLElement) => void) {
  const observer = new MutationObserver((mutations, obs) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) {
      return;
    }

    const tr = element.querySelector('tr');
    if (tr) {
      obs.disconnect();
      callback(element);
      return;
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

waitForElement('.table__root tbody', async (elem) => {
  console.log('tbody is ready');
  await getPlayerFromPageAndUpdateStorage(elem);
});

async function getPlayerFromPageAndUpdateStorage(tableRows: HTMLElement) {
  const playersFromPage = PageHelper.getPlayersStatsFromPage(tableRows);
  console.log(playersFromPage);
  const sotrageManager: StorageManager = await StorageManager.create();

  sotrageManager.updateRaport(playersFromPage);
}
