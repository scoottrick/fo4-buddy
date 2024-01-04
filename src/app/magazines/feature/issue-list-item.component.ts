import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MagazineIssueObject } from "../data-access/magazine";

@Component({
  selector: "fo-issue-list-item",
  template: `<ng-container *ngIf="issue">
    <div class="mb-2">
      <mat-checkbox [checked]="collected" (change)="toggle.emit()">
        <div class="w-full overflow-hidden flex flex-col justify-center">
          <div
            class="font-bold overflow-x-hidden whitespace-nowrap text-ellipsis"
          >
            {{ issue.title }}
          </div>
          <div
            class="whitespace-nowrap overflow-x-hidden text-ellipsis text-xs text-gray-200"
          >
            {{ issue.location.name }}
          </div>
        </div>
        <button mat-icon-button (click)="moreInfoClicked.emit($event)">
          <mat-icon fontIcon="info"></mat-icon>
        </button>
      </mat-checkbox>
    </div>
  </ng-container> `,
  styles: [
    `
      ::ng-deep .mat-expansion-panel-body {
        padding-right: 16px;
      }

      ::ng-deep .mat-mdc-checkbox,
      ::ng-deep .mdc-form-field {
        width: 100%;
      }

      ::ng-deep .mdc-label {
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        flex-direction: row;
      }
    `,
  ],
})
export class IssueListItemComponent {
  @Input() issue?: MagazineIssueObject;
  @Input() collected: boolean = false;
  @Output() toggle = new EventEmitter<void>();
  @Output() moreInfoClicked = new EventEmitter<MouseEvent>();
}
