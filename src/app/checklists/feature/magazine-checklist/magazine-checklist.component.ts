import { Component, inject } from "@angular/core";
import { map } from "rxjs/operators";
import { MagazineService } from "../../data-access/magazine.service";

@Component({
  selector: "fo-magazine-checklist",
  template: `
    <ul>
      <li class="m-2" *ngFor="let magazine of magazines$ | async">
        <fo-magazine-list-item [magazine]="magazine"></fo-magazine-list-item>
      </li>
    </ul>
  `,
  styles: [],
})
export class MagazineChecklistComponent {
  private magazineService = inject(MagazineService);

  magazines$ = this.magazineService.magazines$;
}
