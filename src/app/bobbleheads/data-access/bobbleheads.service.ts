import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";

import { BobbleheadId, BobbleheadObject } from "./bobblehead";
import { CollectionStorageService } from "src/app/_shared/data-access/collection-storage.service";

@Injectable({
  providedIn: "root",
})
export class BobbleheadsService {
  private http = inject(HttpClient);
  private storageService = inject(CollectionStorageService);

  private bobbleheadsSignal = signal<BobbleheadObject[]>([]);

  private collection = new Set<BobbleheadId>([]);
  private collectionSignal = signal<Set<BobbleheadId>>(this.collection);

  getBobbleheads() {
    return this.bobbleheadsSignal.asReadonly();
  }

  getCollection() {
    return this.collectionSignal.asReadonly();
  }

  public fetchData() {
    const collectedBobbleheads = this.storageService.loadBobbleheads();
    this.collection = collectedBobbleheads;
    this.collectionSignal.set(this.collection);

    const dataUrl = "assets/data/bobbleheads.json";
    const request$ = this.http.get<BobbleheadObject[]>(dataUrl);
    request$.subscribe((bobbleheadData) => {
      if (Array.isArray(bobbleheadData)) {
        this.bobbleheadsSignal.set(bobbleheadData);
        this.updateBobbleheadList(bobbleheadData);
      }
    });
  }

  private updateBobbleheadList(newList: BobbleheadObject[]) {
    const removedBobbleheads: BobbleheadId[] = [];
    this.collection.forEach((collectedId) => {
      if (newList.some((bobblehead) => bobblehead.id === collectedId)) {
        return;
      }
      removedBobbleheads.push(collectedId);
    });
    if (!removedBobbleheads.length) {
      return;
    }
    removedBobbleheads.forEach((id) => this.collection.delete(id));
    this.collectionSignal.set(this.collection);
    this.storageService.updateBobbleheads(this.collection);
  }

  public toggleFromCollection(bobbleheadId: BobbleheadId) {
    const isCollected = this.collection.has(bobbleheadId);
    if (isCollected) {
      this.collection.delete(bobbleheadId);
    } else {
      this.collection.add(bobbleheadId);
    }
    this.collectionSignal.set(this.collection);
    this.storageService.updateBobbleheads(this.collection);
  }
}
