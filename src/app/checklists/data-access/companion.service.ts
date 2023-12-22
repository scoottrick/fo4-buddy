import { HttpClient } from "@angular/common/http";
import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { CompanionObject } from "./companion";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CompanionService {
  private http = inject(HttpClient);

  private companionList: WritableSignal<CompanionObject[]> = signal([]);

  public get companions() {
    return this.companionList;
  }

  public fetchData() {
    console.log("what");
    const dataUrl = "assets/data/companions.json";
    const request$ = this.http.get<CompanionObject[]>(dataUrl);
    request$.subscribe((data) => {
      if (Array.isArray(data)) {
        this.companionList.set(data);
      }
    });
  }
}
