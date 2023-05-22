import { Component, inject } from "@angular/core";
import { BobbleheadService } from "../../data-access/bobblehead.service";

@Component({
  selector: "fo-bobblehead-checklist",
  template: ` <div>
    <h1>Bobbleheads</h1>
    <ul>
      <li *ngFor="let bobble of bobbleheads$ | async">{{ bobble.name }}</li>
    </ul>
  </div>`,
  styles: [],
})
export class BobbleheadChecklistComponent {
  private bobbleheadService = inject(BobbleheadService);

  bobbleheads$ = this.bobbleheadService.bobbleheads$;
}
