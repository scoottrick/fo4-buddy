import { Component, OnInit, computed, inject } from "@angular/core";
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
  template: `<ng-container *ngIf="magazines().length">
    <ul>
      <li class="mb-2 last:mb-0" *ngFor="let magazine of magazines()">
        <fo-magazine-list-item
          [magazine]="magazine"
          [collectedIssues]="collection().get(magazine.id)"
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

  magazines = computed(() => {
    const list = this.magazineService.getList();
    return this.sortMagazines(list());
  });
  collection = this.magazineService.getCollection();

  private sortMagazines(magazines: MagazineObject[]) {
    magazines.sort((a, b) => a.title.localeCompare(b.title));
    return magazines;
  }

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
