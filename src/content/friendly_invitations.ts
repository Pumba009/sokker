const invitationThreshold: number = 20000000;

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
  await fetchData(elem);
});

async function fetchData(element: HTMLElement) {
  const rows = element.querySelectorAll<HTMLTableRowElement>('tr');
  if (!rows) {
    return;
  }

  let link: HTMLAnchorElement | null;
  rows.forEach((row) => {
    link = row.querySelector<HTMLAnchorElement>('a[href^="app/team/"]');
    if (!link) {
      return;
    }

    const parts = link?.href?.split('/');
    const teamId = parts ? parts[parts.length - 1] : undefined;

    fetch(`https://sokker.org/api/team/${teamId}/stats`)
      .then((res) => res.json())
      .then((data) => {
        const teamData = data.players.totalValue.value;
        console.log(teamData);
        if (teamData <= invitationThreshold) {
          console.log(
            `wartosc druzyny ${data.id} jest ponizej maksymalnej wartosic: ${invitationThreshold} zl.`,
          );
          const invitation = row.querySelector<HTMLAnchorElement>('a[href^="friendlies/action/"]');
          if (invitation) {
            console.log(`wysylam zaproszenie do ${data.id}`);
            fetch(invitation.href, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // 'X-CSRF-Token': token, // jeśli strona wymaga
              },
            })
              .then((res) => res.json())
              .then((response) => {
                console.log('Odpowiedź po wysłaniu zaproszenia:', response);
              })
              .catch((err) => console.error('Błąd przy wysyłaniu zaproszenia:', err));
          } else {
            console.log(`zaproszenie zostalo juz wyslane do ${data.id}`);
          }
        } else {
          console.log(`druzyna jest za dobra ${teamData}`);
        }
      });
  });
}
//https://sokker.org/api/team/146929/stats
//{"id":146929,"players":{"count":13,"averageAge":27.9231,"averageForm":53,"averageFormSkill":9,"totalValue":{"value":10021000,"currency":"z\u0142"},"averageValue":{"value":770846,"currency":"z\u0142"},"averageMarks":37},"reputation":9,"rankChange":{"currentRank":1766.42,"previousRank":1680.95},"matchesStats":null}

// async function openPage(element: HTMLElement) {
//   const rows = element.querySelectorAll<HTMLTableRowElement>('tr');
//   if(!rows){
//     return;
//   }
//   let link: HTMLAnchorElement | null;
//   rows.forEach((row, index) => {
//     link = row.querySelector<HTMLAnchorElement>('a[href^="app/team/"]');
//     if (link) {
//       console.log(link.textContent?.trim()); // KINGSHOW FC
//       console.log(link.href); // pełny URL

//       chrome.runtime.sendMessage({
//         action: 'OPEN_TAB',
//         url: link.href,
//       });
//     }
//   });
// }
