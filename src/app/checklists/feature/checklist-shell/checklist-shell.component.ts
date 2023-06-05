import { Component, OnInit, inject } from "@angular/core";
import { BobbleheadService } from "../../data-access/bobblehead.service";
import { MagazineService } from "../../data-access/magazine.service";

@Component({
  selector: "fo-checklist-shell",
  templateUrl: "./checklist-shell.component.html",
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class ChecklistShellComponent implements OnInit {
  private bobbleheadService = inject(BobbleheadService);
  private magazineService = inject(MagazineService);

  ngOnInit(): void {
    this.bobbleheadService.fetchData();
    this.magazineService.fetchData();
  }
}
