import { Component, inject } from "@angular/core";
import { map, startWith, tap } from "rxjs/operators";
import { MagazineService } from "../../data-access/magazine.service";
import { MagazineId, MagazineIssueId } from "../../data-access/magazine";
import { Observable, combineLatest, of } from "rxjs";

@Component({
  selector: "fo-magazine-checklist",
  template: `
    <ul *ngIf="vm$ | async as vm">
      <li class="m-2" *ngFor="let magazine of vm.magazines">
        <fo-magazine-list-item
          [magazine]="magazine"
          [collectedIssues]="vm.magazineCollection.get(magazine.id)"
          (toggleCollectedIssue)="toggleIssue(magazine.id, $event)"
        ></fo-magazine-list-item>
      </li>
    </ul>
  `,
  styles: [],
})
export class MagazineChecklistComponent {
  private magazineService = inject(MagazineService);

  vm$ = combineLatest({
    magazines: this.magazineService.magazines$,
    magazineCollection: this.magazineService.magazineCollection$.pipe(
      tap((collection) => {
        console.log("magazine collection updated");
        console.log(collection);
      })
    ),
  });

  toggleIssue(magazineId: MagazineId, issueId: MagazineIssueId) {
    console.log("toggle issue");
    this.magazineService.toggleCollectedIssue(magazineId, issueId);
  }
}
