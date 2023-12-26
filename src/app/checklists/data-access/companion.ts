import {
  CompanionPerk,
  CompanionQuest,
  WikiItem,
  WorldLocation,
} from "src/app/_shared/data-access/wiki";

export type CompanionId = number;

interface CharacterSpecials {
  strength: number;
  perception: number;
  endurance: number;
  charisma: number;
  intelligence: number;
  agility: number;
  luck: number;
}

export type CompanionObject = WikiItem & {
  id: CompanionId;
  locations: WorldLocation[];
  specials: CharacterSpecials[];
  requirements: string;
  romance: boolean;
  perk?: CompanionPerk;
  quest?: CompanionQuest;
};
