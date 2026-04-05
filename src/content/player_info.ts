function redirectToPlayerPage(url: string) {
  url = window.location.href;
  const playerId = url.split('/')[7];
  const playerPageUrl = `https://sokker.org/player/PID/${playerId}`;
  window.location.href = playerPageUrl;
}

async function start() {
  const playerInfoUrl = 'https://sokker.org/pl/app/training/player-info/';
  const url = window.location.href;
  if (url.startsWith(playerInfoUrl)) {
    return redirectToPlayerPage(url);
  }
}

//natychmiastowe uruchomienie - tylko zeby przekierowac na strone zawodnika. (nie ma potrzeby czekana na jakis element strony)
start();
