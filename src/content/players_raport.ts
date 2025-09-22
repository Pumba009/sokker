import { StorageManager } from '../managers/storage_manager';
import { PageHelper } from '../utils/page_helper';

function waitForTableThenGetPlayersStats() {
  waitForElement('.table__root', async (elem: HTMLElement) => {
    console.log('element is ready');
    const tbody = elem.querySelector('tbody') as HTMLTableSectionElement | null;
    if (!tbody) {
      console.log('tbody not find!');
      return;
    }
    await getPlayerFromPageAndUpdateStorage(tbody);
  });

  function waitForElement(selector: string, callback: any) {
    const target = document.querySelector(selector);
    if (target) {
      sleep(500); //dodałem bo dopiero za 5 razem F5 zapisuje do chrome.storage
      callback(target);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        sleep(500); //dodałem bo dopiero za 3-4 refreshem zapisuje do chrome.storage
        callback(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

async function getPlayerFromPageAndUpdateStorage(tableRows: HTMLTableSectionElement) {
  const playersFromPage = PageHelper.GetPlayersStatsFromPage(tableRows);

  const sotrageManager: StorageManager = await StorageManager.Create();
  sotrageManager.UpdateRaport(playersFromPage);
}

/*
Podsumowanie
  Jeśli content ma działać na stronie, lepiej używać messaging niż importować storage.ts.

  background jest centralnym miejscem do trzymania danych.

  content i popup mogą prosić background o dane (chrome.runtime.sendMessage).
 */

window.addEventListener('load', () => {
  waitForTableThenGetPlayersStats();
});
