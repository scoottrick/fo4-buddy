import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { BobbleheadId, BobbleheadObject } from "./bobblehead";
import { CollectionStorageService } from "src/app/_shared/data-access/collection-storage.service";

@Injectable({
  providedIn: "root",
})
export class BobbleheadService {
  private http = inject(HttpClient);
  private storageService = inject(CollectionStorageService);

  private bobbleheadList: BobbleheadObject[] = [];
  private bobbleheadCollection = new Set<BobbleheadId>();

  private bobbleheadSubject = new BehaviorSubject(this.bobbleheadList);
  private bobbleheadCollectionSubject = new BehaviorSubject(
    this.bobbleheadCollection
  );

  public bobbleheads$ = this.bobbleheadSubject.asObservable();
  public bobbleheadCollection$ =
    this.bobbleheadCollectionSubject.asObservable();

  public fetchData() {
    const collectedBobbleheads =
      this.storageService.loadCollections().bobbleheads;
    this.bobbleheadCollection = collectedBobbleheads;
    this.bobbleheadCollectionSubject.next(collectedBobbleheads);

    const dataUrl = "assets/data/bobbleheads.json";
    const request$ = this.http.get<BobbleheadObject[]>(dataUrl);
    request$.subscribe((bobbleheadData) => {
      this.updateBobbleheadList(bobbleheadData);
    });
  }

  private updateBobbleheadList(newList: BobbleheadObject[]) {
    this.bobbleheadList = newList;
    this.bobbleheadSubject.next(newList);

    const removedBobbleheads: BobbleheadId[] = [];
    this.bobbleheadCollection.forEach((collectedId) => {
      if (!newList.some((newBobblehead) => newBobblehead.id === collectedId)) {
        removedBobbleheads.push(collectedId);
      }
    });
    if (!removedBobbleheads.length) {
      return;
    }
    removedBobbleheads.forEach((id) => this.bobbleheadCollection.delete(id));
    this.bobbleheadCollectionSubject.next(this.bobbleheadCollection);
    this.storageService.updateBobbleheads(this.bobbleheadCollection);
  }

  public toggleFromCollection(bobbleheadId: BobbleheadId) {
    const isCollected = this.bobbleheadCollection.has(bobbleheadId);
    if (isCollected) {
      this.bobbleheadCollection.delete(bobbleheadId);
    } else {
      this.bobbleheadCollection.add(bobbleheadId);
    }
    this.bobbleheadCollectionSubject.next(this.bobbleheadCollection);
    this.storageService.updateBobbleheads(this.bobbleheadCollection);
  }
}
