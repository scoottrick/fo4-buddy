import { Component, OnInit, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BobbleheadService } from "./bobbleheads/data-access/bobblehead.service";
import { MagazineService } from "./magazines/data-access/magazine.service";

@Component({
  selector: "fo-root",
  template: `
    <nav class="font-bold">
      <ul>
        <li>Bobbleheads</li>
        <li>Magazines</li>
        <li>Hacking</li>
      </ul>
    </nav>
    <div>
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
  bobbleheadService = inject(BobbleheadService);
  magazineService = inject(MagazineService);

  bobbleheads$ = this.bobbleheadService.bobbleheads$;
  magazines$ = this.magazineService.magazines$;

  ngOnInit(): void {
    this.bobbleheadService.fetchData();
    this.magazineService.fetchData();
  }
}
