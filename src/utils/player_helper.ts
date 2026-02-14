import { IPlayerStats } from '../types/interfaces';

export class PlayerHelper {
  static decodePlayerAttribute(playerAttributeInNumber: string): keyof IPlayerStats {
    switch (playerAttributeInNumber) {
      case '1':
        return 'stamina_num';
      case '2':
        return 'keeper_num';
      case '3':
        return 'playmaker_num';
      case '4':
        return 'pass_num';
      case '5':
        return 'technique_num';
      case '6':
        return 'defense_num';
      case '7':
        return 'striker_num';
      case '8':
        return 'speed_num';
      default:
        return 'stamina_num';
    }
  }
}

export function getPlayerNameFromPage() {
  return document
    .getElementsByClassName('panel-heading')[0]
    .children[1].getElementsByTagName('a')[0].text;
}
