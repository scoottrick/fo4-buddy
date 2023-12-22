import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CompanionService {
  private http = inject(HttpClient);

  public fetchData() {
    console.log("what");
    const dataUrl = "assets/data/companions.json";
    const request$ = this.http.get<any[]>(dataUrl);
    request$.subscribe((data) => {
      console.log("companion data", data);
    });
  }
}
