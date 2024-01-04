import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { CompanionObject } from "./companion";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CompanionsService {
  private http = inject(HttpClient);

  private companionList: WritableSignal<CompanionObject[]> = signal([]);

  public get companions() {
    return this.companionList;
  }

  public fetchData() {
    const dataUrl = "assets/data/companions.json";
    const request$ = this.http.get<CompanionObject[]>(dataUrl);
    request$.subscribe((data) => {
      if (Array.isArray(data)) {
        this.companionList.set(data);
      }
    });
  }
}
