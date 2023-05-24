import { Component, OnInit, inject } from "@angular/core";
import { BobbleheadService } from "../../../data-access/bobblehead.service";
import { MagazineService } from "../../../data-access/magazine.service";

@Component({
  selector: "fo-checklist-shell",
  template: `
    <mat-tab-group
      class="h-full w-full overflow-y-scroll"
      backgroundColor="primary"
      headerPosition="below"
    >
      <mat-tab label="Bobbleheads">
        <fo-bobblehead-checklist></fo-bobblehead-checklist>
      </mat-tab>
      <mat-tab label="Magazines">
        <fo-magazine-checklist></fo-magazine-checklist>
      </mat-tab>
    </mat-tab-group>
  `,
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
