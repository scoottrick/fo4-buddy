export type WikiItem = { name: string; url: string };
export type WorldLocation = WikiItem;
export type CompanionPerk = WikiItem;
export type CompanionQuest = WikiItem;

export function getWikiUrl(endpoint: string) {
  return `https://fallout.fandom.com${endpoint}`;
}
