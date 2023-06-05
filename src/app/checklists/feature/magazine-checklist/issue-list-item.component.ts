import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MagazineIssueObject } from "../../data-access/magazine";

@Component({
  selector: "fo-issue-list-item",
  templateUrl: "./issue-list-item.component.html",
})
export class IssueListItemComponent {
  @Input() issue?: MagazineIssueObject;
  @Input() collected: boolean = false;
  @Output() toggle = new EventEmitter<void>();
}
