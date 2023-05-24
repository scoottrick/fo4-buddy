import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MagazineIssueObject } from "../../data-access/magazine";

@Component({
  selector: "fo-issue-list-item",
  template: `
    <mat-checkbox [checked]="collected" (change)="toggle.emit()">
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
  @Input() collected: boolean = false;
  @Output() toggle = new EventEmitter<void>();
}
