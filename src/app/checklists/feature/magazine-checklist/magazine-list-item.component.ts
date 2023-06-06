import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  MagazineIssueId,
  MagazineIssueObject,
  MagazineObject,
} from "../../data-access/magazine";

@Component({
  selector: "fo-magazine-list-item",
  template: `
    <ng-container *ngIf="magazine && collectedIssues">
      <mat-accordion>
        <mat-expansion-panel hideToggle>
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ magazine.title }}
            </mat-panel-title>
          </mat-expansion-panel-header>

          <ng-container>
            <p>
              Collected: {{ collectedIssues.size }} | Remaining:
              {{ magazine.issues.length - collectedIssues.size }}
            </p>
            <ul>
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
  styles: [],
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
