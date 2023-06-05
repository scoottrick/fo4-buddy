import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MagazineIssueObject } from "../../data-access/magazine";

@Component({
  selector: "fo-issue-list-item",
  templateUrl: "./issue-list-item.component.html",
  styles: [
    `
      ::ng-deep .mat-mdc-checkbox,
      ::ng-deep .mdc-form-field {
        width: 100%;
      }

      ::ng-deep .mdc-label {
        flex-grow: 1;
        overflow: hidden;
      }
    `,
  ],
})
export class IssueListItemComponent {
  @Input() issue?: MagazineIssueObject;
  @Input() collected: boolean = false;
  @Output() toggle = new EventEmitter<void>();
}
