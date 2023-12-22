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

interface WikiItem {
  name: string;
  url: string;
}

interface LocationItem extends WikiItem {}
interface PerkItem extends WikiItem {}
interface QuestItem extends WikiItem {}

export interface CompanionObject {
  id: CompanionId;
  url: string;
  locations: LocationItem[];
  perk: PerkItem;
  prereq: string;
  quest: QuestItem;
  romance: boolean;
  specials: CharacterSpecials[];
}
