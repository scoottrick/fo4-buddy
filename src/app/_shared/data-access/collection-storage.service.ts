import { Injectable } from "@angular/core";
import { BobbleheadId } from "src/app/bobbleheads/data-access/bobblehead";
import {
  MagazineId,
  MagazineIssueId,
} from "src/app/magazines/data-access/magazine";

const bobbleheadTag = "fo:bobbles:";
const magazineTag = "fo:mags:";

type MagazineCollection = Map<MagazineId, Set<MagazineIssueId>>;
type BobbleheadCollection = Set<BobbleheadId>;

type MagazineStorageObject = { [id: MagazineId]: MagazineIssueId[] };
type BobbleheadStorageObject = BobbleheadId[];

@Injectable({
  providedIn: "root",
})
export class CollectionStorageService {
  loadMagazines() {
    return this.loadMagazineCollection();
  }

  loadBobbleheads() {
    return this.loadBobbleheadCollection();
  }

  updateBobbleheads(bobbleheads: BobbleheadCollection) {
    this.storeBobbleheadCollection(bobbleheads);
  }

  updateMagazines(magazines: MagazineCollection) {
    this.storeMagazineCollection(magazines);
  }

  private storeBobbleheadCollection(collection: BobbleheadCollection) {
    const dataObject: BobbleheadStorageObject = Array.from(collection);
    localStorage.setItem(bobbleheadTag, JSON.stringify(dataObject));
  }

  private loadBobbleheadCollection(): BobbleheadCollection {
    const loadedData = localStorage.getItem(bobbleheadTag);
    if (!loadedData) {
      return new Set();
    }
    const storedCollection: BobbleheadStorageObject = JSON.parse(loadedData);
    return new Set(storedCollection);
  }

  private storeMagazineCollection(collection: MagazineCollection) {
    const dataObject: MagazineStorageObject = {};
    collection.forEach((issues, magazineId) => {
      dataObject[magazineId] = Array.from(issues);
    });
    localStorage.setItem(magazineTag, JSON.stringify(dataObject));
  }

  private loadMagazineCollection(): MagazineCollection {
    const loadedData = localStorage.getItem(magazineTag);
    if (!loadedData) {
      return new Map();
    }
    const storedCollection: MagazineStorageObject = JSON.parse(loadedData);
    const newCollection: MagazineCollection = new Map();
    Object.keys(storedCollection).forEach((magId) => {
      const key = parseInt(magId);
      newCollection.set(key, new Set(storedCollection[key]));
    });
    return newCollection;
  }
}
