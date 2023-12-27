import { Component, Inject, Input } from "@angular/core";
import { MagazineIssueObject, MagazineObject } from "../data-access/magazine";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

interface DialogData {
  magazine: MagazineObject;
  issue: MagazineIssueObject;
}

@Component({
  selector: "fo-issue-details",
  templateUrl: "./issue-details.component.html",
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
