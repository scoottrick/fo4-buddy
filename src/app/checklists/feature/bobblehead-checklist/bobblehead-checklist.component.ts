import { Component, inject } from "@angular/core";
import { BobbleheadService } from "../../data-access/bobblehead.service";
import { BobbleheadObject } from "../../data-access/bobblehead";

@Component({
  selector: "fo-bobblehead-checklist",
  template: ` <div class="px-4 pb-2">
    <ul *ngIf="bobbleheads$ | async as bobbleheads">
      <li class="mb-2" *ngFor="let b of bobbleheads">
        <div>
          <fo-checkbox-item
            [checked]="isCollected(b)"
            (toggle)="toggleBobblehead(b)"
          >
            <span class="block text-lg">
              {{ b.name }}
            </span>
            <span class="block text-sm">
              {{ b.location.name }}
            </span>
          </fo-checkbox-item>
        </div>
        <div class="p-1 bg-slate-400 text-white">
          <button class="text-xs">INFO</button>
        </div>
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
