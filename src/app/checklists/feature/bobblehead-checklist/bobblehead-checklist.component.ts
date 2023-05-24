import { Component, inject } from "@angular/core";
import { BobbleheadService } from "../../data-access/bobblehead.service";
import { BobbleheadObject } from "../../data-access/bobblehead";
import { combineLatest } from "rxjs";

@Component({
  selector: "fo-bobblehead-checklist",
  template: ` <ng-container *ngIf="vm$ | async as vm">
    <ul class="p-4">
      <li class="mb-2" *ngFor="let b of vm.bobbleheads">
        <fo-bobblehead-list-item
          [bobblehead]="b"
          [collected]="vm.bobbleheadCollection.has(b.id)"
          (toggleCollected)="toggleBobblehead(b)"
        ></fo-bobblehead-list-item>
      </li>
    </ul>
  </ng-container>`,
  styles: [],
})
export class BobbleheadChecklistComponent {
  private bobbleheadService = inject(BobbleheadService);

  vm$ = combineLatest({
    bobbleheads: this.bobbleheadService.bobbleheads$,
    bobbleheadCollection: this.bobbleheadService.bobbleheadCollection$,
  });

  toggleBobblehead(b: BobbleheadObject) {
    this.bobbleheadService.toggleFromCollection(b);
  }
}
