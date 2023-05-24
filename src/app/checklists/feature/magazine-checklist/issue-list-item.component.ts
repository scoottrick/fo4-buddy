import { Component, Input } from "@angular/core";
import { MagazineIssueObject } from "../../data-access/magazine";

@Component({
  selector: "fo-issue-list-item",
  template: `
    <mat-checkbox>
      <div>
        <div>
          {{ issue?.title }}
        </div>
        <div>
          {{ issue?.location?.name }}
        </div>
      </div>
    </mat-checkbox>
  `,
})
export class IssueListItemComponent {
  @Input() issue?: MagazineIssueObject;
}
