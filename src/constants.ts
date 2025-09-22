// klucze do storage
export const STORAGE_KEYS = {
  PLAYER_DATA: 'PlayersData',
};

// nazwy alarmów
export const ALARMS = {
  //WEEKLY: 'weeklyData',
  SAVE_PLAYERS: 'savePlayers',
  GET_PLAYERS: 'getPlayers',
  GET_PLAYER_BY_NAME: 'getPlayersByName',
};

// inne globalne wartości
export const ONE_WEEK_MS = 1000 * 60 * 60 * 24 * 7;

export const WEEK_IN_MILISECONDS = 604800000;

export const PLAYER_ATTRIBUTES: { key: string; value: number }[] = [
  { key: 'Kondycja', value: 1 },
  { key: 'Gra na bramce', value: 2 },
  { key: 'Rozgrywanie', value: 3 },
  { key: 'Podania', value: 4 },
  { key: 'Technika', value: 5 },
  { key: 'Odbiór piłki', value: 6 },
  { key: 'Strzały', value: 7 },
  { key: 'Szybkość', value: 8 },
];
export const GRADING_SCALE: { key: string; value: number }[] = [
  { key: 'tragiczna', value: 0 },
  { key: 'beznadziejna', value: 1 },
  { key: 'niedostateczna', value: 2 },
  { key: 'mierna', value: 3 },
  { key: 'słaba', value: 4 },
  { key: 'przeciętna', value: 5 },
  { key: 'dostateczna', value: 6 },
  { key: 'dobra', value: 7 },
  { key: 'solidna', value: 8 },
  { key: 'bardzo dobra', value: 9 },
  { key: 'celująca', value: 10 },
  { key: 'świetna', value: 11 },
  { key: 'znakomita', value: 12 },
  { key: 'niesamowita', value: 13 },
  { key: 'olśniewająca', value: 14 },
  { key: 'magiczna', value: 15 },
  { key: 'nieziemska', value: 16 },
  { key: 'boska', value: 17 },
  { key: 'nadboska', value: 18 },
];
