import { Component, Input } from "@angular/core";
import { MagazineIssueObject } from "../../data-access/magazine";

@Component({
  selector: "fo-issue-list-item",
  template: `
    <div>
      {{ issue?.title }}
    </div>
    <div>
      {{ issue?.location?.name }}
    </div>
  `,
})
export class IssueListItemComponent {
  @Input() issue?: MagazineIssueObject;
}
