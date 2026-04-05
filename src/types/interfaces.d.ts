//Litera d w nazwie pliku data.d.ts oznacza, że jest to plik deklaracji TypeScript (ang. declaration file).
// Co to dokładnie oznacza:
//  Nie zawiera implementacji
//    Zawiera tylko deklaracje typów, interfejsów, klas, funkcji itd.
//    Nie ma faktycznego kodu wykonywalnego (czyli JavaScriptu).

//  Użycie w TypeScript
//   TypeScript używa tych plików, aby znać typy dla bibliotek lub modułów, które:
//    są napisane w JS, lub
//    są zewnętrzne (np. @types/lodash).

export interface IPlayersPage {
  id: string;
  name: string;
  playerStats: IPlayerStats;
  trainingDetails: ITrainingDetails;
}

export interface IPlayersData {
  lastUpdateDay: string;
  players: IPlayerDetails[];
}

export interface IPlayerDetails {
  id: string;
  name: string;
  trainingHistory: ITrainingHistory[];
}

export interface ITrainingHistory {
  updateDateTime: string;
  playerStats: IPlayerStats;
  trainingDetails: ITrainingDetails;
}

export interface IPlayerStats {
  defense_num: number;
  keeper_num: number;
  pass_num: number;
  playmaker_num: number;
  speed_num: number;
  stamina_num: number;
  striker_num: number;
  technique_num: number;
}

export interface ITrainingDetails {
  trainingType: string;
  effectivePercentage: string;
}
