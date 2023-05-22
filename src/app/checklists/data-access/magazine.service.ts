import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MagazineObject } from "./magazine";

@Injectable({
  providedIn: "root",
})
export class MagazineService {
  private http = inject(HttpClient);

  private magazineSubject = new BehaviorSubject<MagazineObject[]>([]);
  public magazines$ = this.magazineSubject.asObservable();

  public fetchData() {
    const dataUrl = "assets/data/magazines.json";
    const request$ = this.http.get<MagazineObject[]>(dataUrl);
    request$.subscribe((magazineData) => {
      this.magazineSubject.next(magazineData);
    });
  }
}
