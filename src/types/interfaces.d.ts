//Litera d w nazwie pliku data.d.ts oznacza, że jest to plik deklaracji TypeScript (ang. declaration file).
// Co to dokładnie oznacza:
//  Nie zawiera implementacji
//    Zawiera tylko deklaracje typów, interfejsów, klas, funkcji itd.
//    Nie ma faktycznego kodu wykonywalnego (czyli JavaScriptu).

//  Użycie w TypeScript
//   TypeScript używa tych plików, aby znać typy dla bibliotek lub modułów, które:
//    są napisane w JS, lub
//    są zewnętrzne (np. @types/lodash).

export interface IPlayersData {
  lastUpdateDay: string;
  players: IPlayer[];
}

export interface IPlayer {
  id: string;
  name: string;
  updateDateTime: string[];
  progressHistory: IPlayerStats[];
}

export interface IPlayerStats {
  defense_num: string;
  keeper_num: string;
  pass_num: string;
  playmaker_num: string;
  speed_num: string;
  stamina_num: string;
  striker_num: string;
  technique_num: string;
}

// declare class Player implements IPlayer {
//   id: string;
//   name: string;
//   updateDateTime: Date[];
//   progressHistory: number[];

//   updatePlayerStatistic(playerFromPage: IPlayer): this;
// }
