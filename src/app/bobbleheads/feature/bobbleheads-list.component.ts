import { Component, computed, inject } from "@angular/core";

import { BobbleheadsService } from "../data-access/bobbleheads.service";
import { BobbleheadId, BobbleheadObject } from "../data-access/bobblehead";

@Component({
  selector: "fo-bobbleheads-list",
  template: `<ng-container *ngIf="bobbleheads().length">
    <fo-bobblehead-collection-stats
      [total]="bobbleheads().length"
      [collected]="collection().size"
    ></fo-bobblehead-collection-stats>
    <ul>
      <li class="mb-2 last:mb-0" *ngFor="let bobblehead of bobbleheads()">
        <fo-bobblehead-list-item
          [bobblehead]="bobblehead"
          [collected]="collection().has(bobblehead.id)"
          (toggleCollected)="toggleBobblehead(bobblehead.id)"
        ></fo-bobblehead-list-item>
      </li>
    </ul>
  </ng-container>`,
  styles: ``,
})
export class BobbleheadsListComponent {
  private bobbleheadService = inject(BobbleheadsService);

  bobbleheads = computed(() => {
    const list = this.bobbleheadService.getBobbleheads();
    return this.sortBobbleheads(list());
  });
  collection = this.bobbleheadService.getCollection();

  ngOnInit(): void {
    this.bobbleheadService.fetchData();
  }

  toggleBobblehead(id: BobbleheadId) {
    this.bobbleheadService.toggleFromCollection(id);
  }

  private sortBobbleheads(bobbleheads: BobbleheadObject[]) {
    bobbleheads.sort((a, b) => a.name.localeCompare(b.name));
    return bobbleheads;
  }
}
