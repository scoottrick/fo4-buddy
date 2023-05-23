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

          <div>
            <div>Collected: 0 | Remaining: {{ magazine.issues.length }}</div>
            <ul>
              <li *ngFor="let issue of magazine.issues">
                {{ issue.title }}
              </li>
            </ul>
          </div>
        </mat-expansion-panel>
      </mat-accordion>

      <!-- <fo-card class="flex flex-col justify-between gap-4">
        <div class="relative" (click)="expanded = !expanded">
          <h5
            class="font-bold text-lg w-full overflow-hidden text-ellipsis whitespace-nowrap"
            [ngClass]="{ 'text-xl': !expanded }"
          >
            {{ magazine.title }}
          </h5>
          <div *ngIf="expanded">
            <span>Collected: 0</span>
            <span class="mx-2">|</span>
            <span>Remaining: {{ magazine.issues.length }}</span>
          </div>
          <div class="absolute px-2 py-1 top-0 right-0 text-sm">
            0/{{ magazine.issues.length }}
          </div>
        </div>

        <ng-container *ngIf="expanded">
          <ul class="pl-1 flex flex-col gap-4">
            <li
              class="relative text-gray-400"
              *ngFor="let issue of magazine.issues"
            >
              <span
                class="bg-green-700 px-2 pt-1 pb-1/2 absolute top-0 right-1 text-xs rounded-sm text-gray-50"
                >FOUND</span
              >
              <span class="block">{{ issue.title }}</span>
              <span class="block text-sm">{{ issue.location.name }}</span>
            </li>
          </ul>
        </ng-container>
      </fo-card> -->
    </ng-container>
  `,
  styles: [],
})
export class MagazineListItemComponent {
  @Input() magazine?: MagazineObject;
  expanded = false;
}
