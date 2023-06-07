import { Component, Input } from "@angular/core";

@Component({
  selector: "fo-stat-item",
  template: ` <ng-container *ngIf="label && value !== undefined">
    <span class="text-center">
      <div>{{ label }}</div>
      <div class="mat-h1">{{ value }}</div>
    </span>
  </ng-container>`,
  styles: [
    `
      .mat-h1 {
        margin-bottom: 0;
      }
    `,
  ],
})
export class StatItemComponent {
  @Input() label?: string;
  @Input() value?: number;
}

@Component({
  selector: "fo-bobblehead-collection-stats",
  template: ` <ng-container *ngIf="total && collected">
    <div class="p-4 flex flex-row justify-evenly">
      <fo-stat-item label="Total" [value]="total"></fo-stat-item>
      <fo-stat-item label="Collected" [value]="collected"></fo-stat-item>
      <fo-stat-item
        label="Remaining"
        [value]="total - collected"
      ></fo-stat-item>
    </div>
  </ng-container>`,
  styles: [
    `
      fo-stat-item {
        display: inline-block;
        flex: 1 1 0%;
      }
    `,
  ],
})
export class BobbleheadCollectionStatsComponent {
  @Input() total?: number;
  @Input() collected?: number;
}
