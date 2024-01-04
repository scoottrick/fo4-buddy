import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  MagazineIssueId,
  MagazineIssueObject,
  MagazineObject,
} from "../data-access/magazine";

@Component({
  selector: "fo-magazine-list-item",
  template: `
    <ng-container *ngIf="magazine && collectedIssues">
      <mat-accordion>
        <mat-expansion-panel hideToggle>
          <mat-expansion-panel-header
            collapsedHeight="5em"
            expandedHeight="5em"
          >
            <mat-panel-title>
              <span>
                <div class="text-base">{{ magazine.title }}</div>
                <div class="text-xs text-gray-200">
                  Collected: {{ collectedIssues.size }} | Remaining:
                  {{ magazine.issues.length - collectedIssues.size }}
                </div>
              </span>
            </mat-panel-title>
          </mat-expansion-panel-header>

          <ng-container>
            <ul class="py-1 px-3">
              <li *ngFor="let issue of magazine.issues">
                <fo-issue-list-item
                  [issue]="issue"
                  [collected]="collectedIssues.has(issue.id) || false"
                  (toggle)="toggleCollectedIssue.emit(issue.id)"
                  (moreInfoClicked)="
                    showIssueDetails.emit({ event: $event, issue })
                  "
                ></fo-issue-list-item>
              </li>
            </ul>
          </ng-container>
        </mat-expansion-panel>
      </mat-accordion>
    </ng-container>
  `,
  styles: [
    `
      ::ng-deep .mat-expansion-panel-body {
        padding: 0 !important;
      }
    `,
  ],
})
export class MagazineListItemComponent {
  @Input() magazine?: MagazineObject;
  @Input() collectedIssues?: Set<MagazineIssueId>;
  @Output() toggleCollectedIssue = new EventEmitter<MagazineIssueId>();
  @Output() showIssueDetails = new EventEmitter<{
    event: MouseEvent;
    issue: MagazineIssueObject;
  }>();
}
