import { StorageManager } from '../managers/storage_manager';
import { PageHelper } from '../utils/page_helper';
import { convertStorageData } from '../utils/storage_helper';

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
  await convertStorageData();
  console.log('tbody is ready');
  await getPlayerFromPageAndUpdateStorage(elem);
});

async function getPlayerFromPageAndUpdateStorage(tableRows: HTMLElement) {
  const playersFromPage = PageHelper.getPlayersStatsFromPage(tableRows);
  const storageManager: StorageManager = await StorageManager.create();

  storageManager.updateRaport(playersFromPage);
}
