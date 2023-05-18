import { Component, OnInit, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Component({
  selector: "fo-root",
  template: `
    <div class="font-bold">
      <ul *ngIf="bobbleheads$ | async as bobbles">
        <li *ngFor="let bobble of bobbles">
          {{ bobble.name }}
        </li>
      </ul>
      <hr />
      <ul *ngIf="magazines$ | async as mags">
        <li *ngFor="let mag of mags">{{ mag.title }}</li>
      </ul>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);

  bobbleheads$ = this.http.get<BobbleheadObject[]>(
    "assets/data/bobbleheads.json"
  );
  magazines$ = this.http.get<MagazineObject[]>("assets/data/magazines.json");

  ngOnInit(): void {}
}

interface BobbleheadObject {
  id: number;
  name: string;
  url: string;
  location: LocationObject;
}

interface LocationObject {
  name: string;
  url: string;
}

interface MagazineObject {
  id: number;
  title: string;
  url: string;
  issues: MagazineIssueObject[];
}

interface MagazineIssueObject {
  id: number;
  title: string;
  effect: string;
  location: LocationObject;
}
