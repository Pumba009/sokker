import { IPlayersData, IPlayerDetails, ITrainingHistory } from '../types/interfaces';
import { action } from '../constants';

export async function loadPlayersStatsFromStorageViaMassage(): Promise<IPlayersData> {
  return chrome.runtime.sendMessage({
    action: action.GET_PLAYERS,
  });
}

export async function loadPlayerStatsFromStorage(playerName: string): Promise<IPlayerDetails> {
  return chrome.runtime.sendMessage({
    action: action.GET_PLAYER_BY_NAME,
    payload: playerName,
  });
}

export async function savePlayersStatsToStorageViaMassage(playersToLolcalStorage: IPlayersData) {
  chrome.runtime.sendMessage({
    action: action.SAVE_PLAYERS,
    payload: playersToLolcalStorage,
  });
  console.log('📦 Save Players using background: ', playersToLolcalStorage);
}

// export async function LoadCredentialsFromStorageViaMassage(): Promise<ICredentials> {
//   return chrome.runtime.sendMessage({
//     action: action.GET_CREDENTIALS,
//   });
// }

// export async function SaveCredentialsFromStorageViaMassage(data: ICredentials) {
//   // : Promise<boolean>
//   return chrome.runtime.sendMessage({
//     action: action.SAVE_CREDENTIALS,
//     payload: data,
//   });
// }

export async function convertStorageData() {
  const playersDetails = (await loadPlayersStatsFromStorageViaMassage()) as any;
  //console.log(playersDetails);

  const playersnew: IPlayerDetails[] = [];
  const playersDetailsNew: IPlayersData = {
    lastUpdateDay: playersDetails.lastUpdateDay,
    players: playersnew,
  };

  playersDetails.players.forEach((p) => {
    const th: ITrainingHistory[] = [];
    if (p.progressHistory) {
      for (let i = 0; i < p.progressHistory?.length; i++) {
        th.push({
          playerStats: p.progressHistory[i],
          updateDateTime: p.updateDateTime[i],
          trainingDetails: { effectivePercentage: '-', trainingType: '-' },
        });
      }
    } else {
      th.push(...p.trainingHistory);
    }

    const pl: IPlayerDetails = {
      id: p.id,
      name: p.name,
      trainingHistory: th,
    };

    playersnew.push(pl);
  });

  //console.log(playersDetailsNew);
  await savePlayersStatsToStorageViaMassage(playersDetailsNew);
}
