import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BobbleheadObject } from "./bobblehead";

@Injectable({
  providedIn: "root",
})
export class BobbleheadService {
  private http = inject(HttpClient);

  private collectedBobbleheads: number[] = [];
  private bobbleheadSubject = new BehaviorSubject<BobbleheadObject[]>([]);
  public bobbleheads$ = this.bobbleheadSubject.asObservable();

  public fetchData() {
    const dataUrl = "assets/data/bobbleheads.json";
    const request$ = this.http.get<BobbleheadObject[]>(dataUrl);
    request$.subscribe((bobbleheadData) => {
      this.bobbleheadSubject.next(bobbleheadData);
    });
  }

  public isCollected(bobblehead: BobbleheadObject) {
    return this.collectedBobbleheads.indexOf(bobblehead.id) >= 0;
  }

  public toggleFromCollection(bobblehead: BobbleheadObject) {
    const index = this.collectedBobbleheads.indexOf(bobblehead.id);
    if (index < 0) {
      this.collectedBobbleheads.push(bobblehead.id);
    } else {
      this.collectedBobbleheads.splice(index, 1);
    }
  }
}
