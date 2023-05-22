import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BobbleheadObject } from "src/app/bobbleheads/data-access/bobblehead";

@Injectable({
  providedIn: "root",
})
export class BobbleheadService {
  private http = inject(HttpClient);

  private bobbleheadSubject = new BehaviorSubject<BobbleheadObject[]>([]);
  public bobbleheads$ = this.bobbleheadSubject.asObservable();

  public fetchData() {
    const dataUrl = "assets/data/bobbleheads.json";
    const request$ = this.http.get<BobbleheadObject[]>(dataUrl);
    request$.subscribe((bobbleheadData) => {
      this.bobbleheadSubject.next(bobbleheadData);
    });
  }
}
