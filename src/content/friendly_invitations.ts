console.log('friendly_invitations');

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

waitForElement('table.table.table-striped tbody', async (elem) => {
  console.log('tbody is ready');
  await openPage(elem);
});

async function openPage(element: HTMLElement) {
  let link: HTMLAnchorElement | null;
  const rows = element.querySelectorAll<HTMLTableRowElement>('tr');
  rows.forEach((row, index) => {
    console.log(`${row}-${index}`);
    //<a href="app/team/113232" class="">KINGSHOW  FC</a>
    link = document.querySelector<HTMLAnchorElement>('a[href^="app/team/"]');
    if (link) {
      console.log(link.textContent?.trim()); // KINGSHOW FC
      console.log(link.href); // pełny URL

      chrome.runtime.sendMessage({
        action: 'OPEN_TAB',
        url: link.href,
      });
    }
  });
}
