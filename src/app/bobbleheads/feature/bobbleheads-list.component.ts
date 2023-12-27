import { Component, inject } from "@angular/core";
import { combineLatest, map } from "rxjs";

import { BobbleheadsService } from "../data-access/bobbleheads.service";
import { BobbleheadId } from "../data-access/bobblehead";

@Component({
  selector: "fo-bobbleheads-list",
  template: `<ng-container *ngIf="vm$ | async as vm">
    <fo-bobblehead-collection-stats
      [total]="vm.bobbleheads.length"
      [collected]="vm.bobbleheadCollection.size"
    ></fo-bobblehead-collection-stats>
    <ul>
      <li class="mb-2 last:mb-0" *ngFor="let bobblehead of vm.bobbleheads">
        <fo-bobblehead-list-item
          [bobblehead]="bobblehead"
          [collected]="vm.bobbleheadCollection.has(bobblehead.id)"
          (toggleCollected)="toggleBobblehead(bobblehead.id)"
        ></fo-bobblehead-list-item>
      </li>
    </ul>
  </ng-container>`,
  styles: ``,
})
export class BobbleheadsListComponent {
  private bobbleheadService = inject(BobbleheadsService);

  vm$ = combineLatest({
    bobbleheads: this.bobbleheadService.bobbleheads$.pipe(
      map((bobblheadData) => {
        const sorted = bobblheadData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return sorted;
      })
    ),
    bobbleheadCollection: this.bobbleheadService.bobbleheadCollection$,
  });

  ngOnInit(): void {
    this.bobbleheadService.fetchData();
  }

  toggleBobblehead(id: BobbleheadId) {
    this.bobbleheadService.toggleFromCollection(id);
  }
}
