import { Component, OnInit, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BobbleheadService } from "./checklists/data-access/bobblehead.service";
import { MagazineService } from "./checklists/data-access/magazine.service";

@Component({
  selector: "fo-root",
  template: `
    <nav class="font-bold">
      <ul>
        <li><a routerLink="/checklists">Checklists</a></li>
        <li><a routerLink="/hacking">Hacking</a></li>
      </ul>
    </nav>
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
