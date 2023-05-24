import { Component, OnInit, inject } from "@angular/core";
import { combineLatest } from "rxjs";

import { MagazineService } from "../../data-access/magazine.service";
import { MagazineId, MagazineIssueId } from "../../data-access/magazine";

@Component({
  selector: "fo-magazine-checklist",
  template: `<ng-container *ngIf="vm$ | async as vm">
    <ul class="p-4">
      <li class="mb-2" *ngFor="let magazine of vm.magazines">
        <fo-magazine-list-item
          [magazine]="magazine"
          [collectedIssues]="vm.magazineCollection.get(magazine.id)"
          (toggleCollectedIssue)="toggleMagazineIssue(magazine.id, $event)"
        ></fo-magazine-list-item>
      </li>
    </ul>
  </ng-container>`,
  styles: [],
})
export class MagazineChecklistComponent implements OnInit {
  private magazineService = inject(MagazineService);

  vm$ = combineLatest({
    magazines: this.magazineService.magazines$,
    magazineCollection: this.magazineService.magazineCollection$,
  });

  ngOnInit(): void {
    this.magazineService.fetchData();
  }

  toggleMagazineIssue(magazineId: MagazineId, issueId: MagazineIssueId) {
    this.magazineService.toggleIssueFromCollection(magazineId, issueId);
  }
}
