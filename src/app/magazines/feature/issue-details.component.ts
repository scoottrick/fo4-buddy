import { Component, Inject } from "@angular/core";
import { MagazineIssueObject, MagazineObject } from "../data-access/magazine";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

interface DialogData {
  magazine: MagazineObject;
  issue: MagazineIssueObject;
}

@Component({
  selector: "fo-issue-details",
  template: `<ng-container *ngIf="data.issue">
    <h1 mat-dialog-title>{{ data.issue.title }}</h1>
    <div mat-dialog-content>
      <div class="mb-2">
        <div class="mat-h5">Effect</div>
        <div class="">{{ data.issue.effect }}</div>
      </div>

      <div class="mb-2">
        <div class="mat-h5">Location</div>
        <fo-text-link
          [href]="data.issue.location.url | wikiUrl"
          [text]="data.issue.location.name"
        ></fo-text-link>
      </div>

      <div>
        <div class="mat-h5">Magazine Info</div>
        <fo-text-link
          [href]="data.magazine.url | wikiUrl"
          [text]="data.magazine.title"
        ></fo-text-link>
      </div>
    </div>
  </ng-container> `,
  styles: [
    `
      .mat-h3,
      .mat-h5,
      .link {
        margin-bottom: 4px;
      }
    `,
  ],
})
export class IssueDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
