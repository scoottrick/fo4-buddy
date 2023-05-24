import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BobbleheadId, BobbleheadObject } from "./bobblehead";

@Injectable({
  providedIn: "root",
})
export class BobbleheadService {
  private http = inject(HttpClient);

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
  }

  public toggleFromCollection(bobblehead: BobbleheadObject) {
    const isCollected = this.bobbleheadCollection.has(bobblehead.id);
    if (isCollected) {
      this.bobbleheadCollection.delete(bobblehead.id);
    } else {
      this.bobbleheadCollection.add(bobblehead.id);
    }
    this.bobbleheadCollectionSubject.next(this.bobbleheadCollection);
  }
}
