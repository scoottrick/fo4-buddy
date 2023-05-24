import { Component, OnInit, inject } from "@angular/core";
import { combineLatest } from "rxjs";

import { BobbleheadService } from "../../data-access/bobblehead.service";
import { BobbleheadId } from "../../data-access/bobblehead";

@Component({
  selector: "fo-bobblehead-checklist",
  template: ` <ng-container *ngIf="vm$ | async as vm">
    <ul class="p-4">
      <li class="mb-2" *ngFor="let bobblehead of vm.bobbleheads">
        <fo-bobblehead-list-item
          [bobblehead]="bobblehead"
          [collected]="vm.bobbleheadCollection.has(bobblehead.id)"
          (toggleCollected)="toggleBobblehead(bobblehead.id)"
        ></fo-bobblehead-list-item>
      </li>
    </ul>
  </ng-container>`,
  styles: [],
})
export class BobbleheadChecklistComponent implements OnInit {
  private bobbleheadService = inject(BobbleheadService);

  vm$ = combineLatest({
    bobbleheads: this.bobbleheadService.bobbleheads$,
    bobbleheadCollection: this.bobbleheadService.bobbleheadCollection$,
  });

  ngOnInit(): void {
    this.bobbleheadService.fetchData();
  }

  toggleBobblehead(id: BobbleheadId) {
    this.bobbleheadService.toggleFromCollection(id);
  }
}
