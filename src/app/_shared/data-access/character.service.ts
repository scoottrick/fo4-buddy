import { Injectable, signal } from "@angular/core";

type MagazineCollection = Map<number, Set<number>>;
type BobbleheadCollection = Set<number>;

export type CharacterInfo = {
  name: string;
  collectables: {
    bobbleheads: BobbleheadCollection;
    magazines: MagazineCollection;
  };
};

type StoredCharacter = {
  name: string;
  b: string;
  m: string;
};

const CHARACTER_PREFIX = "fo-character:";
const ACTIVE_CHARACTER_PREFIX = "fo-active-character";

@Injectable({ providedIn: "root" })
export class CharacterService {
  private characterList = signal<CharacterInfo[]>([]);

  public getCharacterList() {
    return this.characterList.asReadonly();
  }

  public loadSavedData() {
    let characters = this.loadCharacters();
    if (!characters.length) {
      characters = [this.createFreshCharacter()];
    }
    this.characterList.set(characters);
  }

  private createFreshCharacter(): CharacterInfo {
    return {
      name: "Default Character",
      collectables: {
        bobbleheads: new Set(),
        magazines: new Map(),
      },
    };
  }

  private loadCharacters(): CharacterInfo[] {
    const characters: CharacterInfo[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(CHARACTER_PREFIX)) {
        continue;
      }
      const storedData = localStorage.getItem(key);
      if (!storedData) {
        continue;
      }
      characters.push(this.parseCharacterData(storedData));
    }
    return characters;
  }

  private saveCharacterData(character: CharacterInfo) {
    const key = this.getStorageKeyForCharacter(character);
    localStorage.setItem(key, this.serializeCharacterData(character));
  }

  private deleteCharacterData(character: CharacterInfo) {
    const key = this.getStorageKeyForCharacter(character);
    localStorage.removeItem(key);
  }

  private getStorageKeyForCharacter(character: CharacterInfo): string {
    return `${CHARACTER_PREFIX}${character.name}`;
  }

  private serializeCharacterData(character: CharacterInfo): string {
    const data: StoredCharacter = {
      name: character.name,
      b: this.serializeBobbleheadCollection(character.collectables.bobbleheads),
      m: this.serializeMagazineCollection(character.collectables.magazines),
    };
    return JSON.stringify(data);
  }

  private parseCharacterData(characterStr: string): CharacterInfo {
    const data: StoredCharacter = JSON.parse(characterStr);
    return {
      name: data.name,
      collectables: {
        bobbleheads: this.parseBobbleheadCollection(data.b),
        magazines: this.parseMagazineCollection(data.m),
      },
    };
  }

  private serializeBobbleheadCollection(col: BobbleheadCollection): string {
    return Array.from(col).join(",");
  }

  private parseBobbleheadCollection(
    collectionStr: string
  ): BobbleheadCollection {
    const collection = new Set() as BobbleheadCollection;
    for (const str of collectionStr.split(",")) {
      collection.add(parseInt(str));
    }
    return collection;
  }

  private serializeMagazineCollection(col: MagazineCollection): string {
    return Array.from(col.entries())
      .map(([id, collected]) => `${id}:${Array.from(collected).join(",")}`)
      .join(";");
  }

  private parseMagazineCollection(collectionStr: string): MagazineCollection {
    const collection = new Map() as MagazineCollection;
    for (const magazineData of collectionStr.split(";")) {
      const issuesCollected = new Set<number>();
      const [magId, issueIds] = magazineData.split(":");
      for (const id of issueIds.split(",")) {
        issuesCollected.add(parseInt(id));
      }
      collection.set(parseInt(magId), issuesCollected);
    }
    return collection;
  }
}
