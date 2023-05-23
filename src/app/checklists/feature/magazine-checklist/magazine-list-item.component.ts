import { Component, Input } from "@angular/core";
import { MagazineObject } from "../../data-access/magazine";

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
                <fo-issue-list-item [issue]="issue"></fo-issue-list-item>
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
  expanded = false;
}
