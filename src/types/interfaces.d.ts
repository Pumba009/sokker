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
  lastUpdateDay: Date;
  players: IPlayer[];
}

export interface IPlayer {
  id: string;
  name: string;
  updateDateTime: Date[];
  progressHistory: IPlayerStats[];
}

export interface IPlayerStats {
  defense_num: number;
  keeper_num: number;
  pass_num: umber;
  playmaker_num: umber;
  speed_num: umber;
  stamina_num: umber;
  striker_num: umber;
  technique_num: umber;
}

// declare class Player implements IPlayer {
//   id: string;
//   name: string;
//   updateDateTime: Date[];
//   progressHistory: number[];

//   updatePlayerStatistic(playerFromPage: IPlayer): this;
// }
