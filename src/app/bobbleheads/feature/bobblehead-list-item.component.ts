import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BobbleheadObject } from "../data-access/bobblehead";

@Component({
  selector: "fo-bobblehead-list-item",
  template: `<ng-container *ngIf="bobblehead">
    <mat-expansion-panel>
      <mat-expansion-panel-header
        [collapsedHeight]="collected ? '4em' : '7em'"
        [expandedHeight]="collected ? '4em' : '7em'"
      >
        <mat-panel-title>
          <ng-container *ngIf="collected">
            <mat-icon class="mr-4" fontIcon="done"></mat-icon>
            <span class="text-lg">{{ bobblehead.name }}</span>
          </ng-container>
          <ng-container *ngIf="!collected">
            <span>
              <div class="text-lg">{{ bobblehead.name }}</div>
              <div class="text-gray-200 text-xs">
                {{ bobblehead.location.name }}
              </div>
              <div class="text-gray-200 text-xs">
                {{ bobblehead.effect }}
              </div>
            </span>
          </ng-container>
        </mat-panel-title>
      </mat-expansion-panel-header>

      <div class="my-4 flex flex-row">
        <button class="flex-1 text-center" (click)="toggleCollected.emit()">
          <mat-icon fontIcon="done"></mat-icon>
          <div>{{ collected ? "Collected" : "Collect" }}</div>
        </button>
        <a
          class="flex-1 text-center"
          target="_blank"
          [href]="bobblehead.url | wikiUrl"
        >
          <mat-icon fontIcon="info"></mat-icon>
          <div>Details</div>
        </a>
        <a
          class="flex-1 text-center"
          target="_blank"
          [href]="bobblehead.location.url | wikiUrl"
        >
          <mat-icon fontIcon="travel_explore"></mat-icon>
          <div>Location</div>
        </a>
      </div>
    </mat-expansion-panel>
  </ng-container> `,
})
export class BobbleheadListItemComponent {
  @Input() collected: boolean = false;
  @Input() bobblehead?: BobbleheadObject;
  @Output() toggleCollected = new EventEmitter<void>();
}
