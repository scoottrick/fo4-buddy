import { Component, Input } from "@angular/core";
import { MagazineObject } from "../../data-access/magazine";

@Component({
  selector: "fo-magazine-list-item",
  template: `
    <ng-container *ngIf="magazine">
      <div
        class="bg-stone-800 rounded-md text-gray-200 p-4 flex flex-col justify-between gap-4"
      >
        <div (click)="expanded = !expanded">
          <h5
            class="font-bold text-lg w-full overflow-hidden text-ellipsis whitespace-nowrap"
            [ngClass]="{ 'text-xl': !expanded }"
          >
            {{ magazine.title }}
          </h5>
        </div>

        <ng-container *ngIf="expanded">
          <ul class="pl-1 flex flex-col gap-4">
            <li class="relative" *ngFor="let issue of magazine.issues">
              <span class="block">{{ issue.title }}</span>
              <span class="block text-sm">{{ issue.location.name }}</span>
            </li>
          </ul>
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class MagazineListItemComponent {
  @Input() magazine?: MagazineObject;
  expanded = false;
}
