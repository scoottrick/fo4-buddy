import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { CollectionStorageService } from "src/app/_shared/data-access/collection-storage.service";
import { MagazineId, MagazineIssueId, MagazineObject } from "./magazine";

type MagazineCollection = Map<MagazineId, Set<MagazineIssueId>>;

@Injectable({
  providedIn: "root",
})
export class MagazinesService {
  private http = inject(HttpClient);
  private storageService = inject(CollectionStorageService);

  private collection: MagazineCollection = new Map();

  private listSignal = signal<MagazineObject[]>([]);
  private collectionSignal = signal<MagazineCollection>(this.collection);

  getList() {
    return this.listSignal.asReadonly();
  }

  getCollection() {
    return this.collectionSignal.asReadonly();
  }

  public fetchData() {
    const collectedIssues = this.storageService.loadMagazines();
    this.collection = collectedIssues;
    this.collectionSignal.set(collectedIssues);

    const dataUrl = "assets/data/magazines.json";
    const request$ = this.http.get<MagazineObject[]>(dataUrl);
    request$.subscribe((magazineData) => {
      this.updateMagazineList(magazineData);
    });
  }

  public toggleIssueFromCollection(
    magazineId: MagazineId,
    issueId: MagazineIssueId
  ) {
    const issuesFromMagazine = this.collection.get(magazineId);
    if (!issuesFromMagazine) {
      return;
    }
    const isCollected = issuesFromMagazine.has(issueId);
    if (isCollected) {
      issuesFromMagazine.delete(issueId);
    } else {
      issuesFromMagazine.add(issueId);
    }
    this.collection.set(magazineId, issuesFromMagazine);
    this.collectionSignal.set(this.collection);
    this.storageService.updateMagazines(this.collection);
  }

  private updateMagazineList(newList: MagazineObject[]) {
    this.listSignal.set(newList);
    let hasUpdated = false;
    newList.forEach((newMagazine) => {
      if (this.collection.has(newMagazine.id)) {
        return;
      }
      this.collection.set(newMagazine.id, new Set());
      hasUpdated = true;
    });
    if (hasUpdated) {
      this.collectionSignal.set(this.collection);
      this.storageService.updateMagazines(this.collection);
    }
  }
}
