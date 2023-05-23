import { Component, inject } from "@angular/core";
import { BobbleheadService } from "../../data-access/bobblehead.service";
import { BobbleheadObject } from "../../data-access/bobblehead";

@Component({
  selector: "fo-bobblehead-checklist",
  template: ` <div class="p-4">
    <ul *ngIf="bobbleheads$ | async as bobbleheads">
      <li class="mb-2" *ngFor="let b of bobbleheads">
        <fo-bobblehead-list-item
          [bobblehead]="b"
          [collected]="isCollected(b)"
          (toggleCollected)="toggleBobblehead(b)"
        ></fo-bobblehead-list-item>
      </li>
    </ul>
  </div>`,
  styles: [],
})
export class BobbleheadChecklistComponent {
  private bobbleheadService = inject(BobbleheadService);

  bobbleheads$ = this.bobbleheadService.bobbleheads$;

  isCollected(b: BobbleheadObject) {
    return this.bobbleheadService.isCollected(b);
  }

  toggleBobblehead(b: BobbleheadObject) {
    this.bobbleheadService.toggleFromCollection(b);
  }
}
