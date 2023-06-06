import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import {
  MagazineIssueId,
  MagazineIssueObject,
  MagazineObject,
} from "../../data-access/magazine";
import { MagazineService } from "../../data-access/magazine.service";

@Component({
  selector: "fo-magazine-list-item",
  template: `
    <ng-container *ngIf="magazine">
      <mat-accordion>
        <mat-expansion-panel hideToggle>
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ magazine.title }}
            </mat-panel-title>
          </mat-expansion-panel-header>

          <ng-container>
            <ul>
              <li *ngFor="let issue of magazine.issues">
                <fo-issue-list-item
                  [issue]="issue"
                  [collected]="collectedIssues?.has(issue.id) || false"
                  (toggle)="toggleCollectedIssue.emit(issue.id)"
                  (moreInfoClicked)="
                    showIssueDetails.emit({ event: $event, issue })
                  "
                ></fo-issue-list-item>
              </li>
            </ul>
            <p>Collected: 0 | Remaining: {{ magazine.issues.length }}</p>
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
