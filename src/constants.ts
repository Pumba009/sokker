import { IPlayerStats } from './types/interfaces';

// klucze do storage
export const storageKeys = {
  PLAYER_DATA: 'PlayersData',
  CREDENTIALS: 'Credentials',
} as const;

// nazwy alarmów
export const action = {
  SAVE_PLAYERS: 'savePlayers',
  GET_PLAYERS: 'getPlayers',
  GET_PLAYER_BY_NAME: 'getPlayersByName',

  SAVE_CREDENTIALS: 'saveCredentials',
  GET_CREDENTIALS: 'getCredentials',

  //WEEKLY: 'weeklyData',
} as const;

export const weekInMs = 604800000;

export const playerAttributes: { key: string; value: number }[] = [
  { key: 'Kondycja', value: 1 },
  { key: 'Gra na bramce', value: 2 },
  { key: 'Rozgrywanie', value: 3 },
  { key: 'Podania', value: 4 },
  { key: 'Technika', value: 5 },
  { key: 'Odbiór piłki', value: 6 },
  { key: 'Strzały', value: 7 },
  { key: 'Szybkość', value: 8 },
];
export const gradingScale: { key: string; value: number }[] = [
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

export const playerAttributesShortName: { key: string; value: string }[] = [
  { key: 'stamina', value: 'Kon.' },
  { key: 'keeper', value: 'Br.' },
  { key: 'playmaking', value: 'Roz.' },
  { key: 'passing', value: 'Pod.' },
  { key: 'technique', value: 'Tech.' },
  { key: 'defending', value: 'Obr.' },
  { key: 'striker', value: 'Str.' },
  { key: 'pace', value: 'Sz.' },
];

export const playerAttributesMapper: { key: keyof IPlayerStats; value: string }[] = [
  { key: 'stamina_num', value: 'stamina' },
  { key: 'keeper_num', value: 'keeper' },
  { key: 'playmaker_num', value: 'playmaking' },
  { key: 'pass_num', value: 'passing' },
  { key: 'technique_num', value: 'technique' },
  { key: 'defense_num', value: 'defending' },
  { key: 'striker_num', value: 'striker' },
  { key: 'speed_num', value: 'pace' },
];
