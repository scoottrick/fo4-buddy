import { Component, inject } from "@angular/core";
import { MagazineService } from "../../data-access/magazine.service";

@Component({
  selector: "fo-magazine-checklist",
  template: `
    <ul>
      <li *ngFor="let magazine of magazines$ | async">
        <h5 class="font-bold">{{ magazine.title }}</h5>
        <ul class="pl-4">
          <li *ngFor="let issue of magazine.issues">
            <p class="text-center">{{ issue.title }}</p>
          </li>
        </ul>
      </li>
    </ul>
  `,
  styles: [],
})
export class MagazineChecklistComponent {
  private magazineService = inject(MagazineService);

  magazines$ = this.magazineService.magazines$;
}
