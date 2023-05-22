import { Component, OnInit, inject } from "@angular/core";
import { BobbleheadService } from "../../../data-access/bobblehead.service";
import { MagazineService } from "../../../data-access/magazine.service";

@Component({
  selector: "fo-checklist-shell",
  template: `<div>
    <div>
      <a routerLink="/checklists/bobbleheads">Bobbleheads</a
      ><a routerLink="/checklists/magazines">Magazines</a>
    </div>
    <router-outlet></router-outlet>
  </div> `,
  styles: [],
})
export class ChecklistShellComponent implements OnInit {
  private bobbleheadService = inject(BobbleheadService);
  private magazineService = inject(MagazineService);

  ngOnInit(): void {
    this.bobbleheadService.fetchData();
    this.magazineService.fetchData();
  }
}
