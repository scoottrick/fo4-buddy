import { Component, OnInit, inject } from "@angular/core";
import { combineLatest, map } from "rxjs";

import { MagazinesService } from "../data-access/magazines.service";
import {
  MagazineId,
  MagazineIssueId,
  MagazineIssueObject,
  MagazineObject,
} from "../data-access/magazine";
import { MatDialog } from "@angular/material/dialog";
import { IssueDetailsComponent } from "./issue-details.component";

@Component({
  selector: "fo-magazines-list",
  template: `<ng-container *ngIf="vm$ | async as vm">
    <ul class="p-4">
      <li class="mb-2" *ngFor="let magazine of vm.magazines">
        <fo-magazine-list-item
          [magazine]="magazine"
          [collectedIssues]="vm.magazineCollection.get(magazine.id)"
          (toggleCollectedIssue)="toggleMagazineIssue(magazine.id, $event)"
          (showIssueDetails)="showIssueDialog(magazine, $event.issue)"
        ></fo-magazine-list-item>
      </li>
    </ul>
  </ng-container>`,
  styles: [],
})
export class MagazinesListComponent implements OnInit {
  private magazineService = inject(MagazinesService);
  private dialog = inject(MatDialog);

  vm$ = combineLatest({
    magazines: this.magazineService.magazines$.pipe(
      map((magazineData) => {
        const sorted = magazineData.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        return sorted;
      })
    ),
    magazineCollection: this.magazineService.magazineCollection$,
  });

  ngOnInit(): void {
    this.magazineService.fetchData();
  }

  toggleMagazineIssue(magazineId: MagazineId, issueId: MagazineIssueId) {
    this.magazineService.toggleIssueFromCollection(magazineId, issueId);
  }

  showIssueDialog(magazine: MagazineObject, issue: MagazineIssueObject) {
    this.dialog.open(IssueDetailsComponent, {
      data: { issue, magazine },
    });
  }
}
