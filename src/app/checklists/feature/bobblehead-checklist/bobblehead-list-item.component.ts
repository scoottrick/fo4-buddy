import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BobbleheadObject } from "../../data-access/bobblehead";

@Component({
  selector: "fo-bobblehead-list-item",
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon *ngIf="collected" class="mr-2" fontIcon="done"></mat-icon>
          {{ bobblehead?.name }}
        </mat-panel-title>
      </mat-expansion-panel-header>
      <div class="mb-2">
        <div>
          <a mat-button color="accent" [href]="bobblehead?.url">More Info</a>
        </div>
        <div>
          Location:
          <a mat-button color="accent" [href]="bobblehead?.location?.url">{{
            bobblehead?.location?.name
          }}</a>
        </div>
        <div>Effect: {{ bobblehead?.effect }}</div>
      </div>

      <ng-container *ngIf="!collected">
        <button
          mat-stroked-button
          color="accent"
          (click)="toggleCollected.emit()"
        >
          Collect
        </button>
      </ng-container>
      <ng-container *ngIf="collected">
        <button mat-flat-button color="accent" (click)="toggleCollected.emit()">
          Collected
        </button>
      </ng-container>
    </mat-expansion-panel>
  `,
})
export class BobbleheadListItem {
  @Input() collected: boolean = false;
  @Input() bobblehead?: BobbleheadObject;
  @Output() toggleCollected = new EventEmitter<void>();
  expanded = false;
}
