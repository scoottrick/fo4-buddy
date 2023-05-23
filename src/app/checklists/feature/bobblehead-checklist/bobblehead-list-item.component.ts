import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BobbleheadObject } from "../../data-access/bobblehead";
import { CommonModule } from "@angular/common";

@Component({
  selector: "fo-text-link",
  standalone: true,
  imports: [CommonModule],
  template: `<a [href]="href" class="underline text-green-500"
    ><ng-content></ng-content
  ></a>`,
})
export class TextLinkComponent {
  @Input() href: string = "";
}

@Component({
  selector: "fo-bobblehead-list-item",
  template: `<ng-container *ngIf="bobblehead">
    <fo-card>
      <div class="flex flex-row">
        <div class="flex-grow" (click)="expanded = true">
          <h2 class="text-lg">
            {{ bobblehead.name }}
          </h2>
        </div>
        <button (click)="toggleCollected.emit()">
          {{ collected ? "X" : "C" }}
        </button>
      </div>
      <div *ngIf="expanded" class="text-sm mt-4 mb-2">
        <p>
          <fo-text-link [href]="bobblehead.url">Wiki Page</fo-text-link>
        </p>
        <p>
          <span class="text-gray-300">Location: </span
          ><fo-text-link [href]="bobblehead.location.url">{{
            bobblehead.location.name
          }}</fo-text-link>
        </p>
        <p>
          <span class="text-gray-300">Effect: </span>{{ bobblehead.effect }}
        </p>
        <div class="mt-2">
          <button
            class="border border-green-500 text-green-500 px-4 py-1 rounded text-sm"
            (click)="expanded = false"
          >
            {{ expanded ? "close" : "info" }}
          </button>
        </div>
      </div>
    </fo-card>
  </ng-container>`,
})
export class BobbleheadListItem {
  @Input() collected: boolean = false;
  @Input() bobblehead?: BobbleheadObject;
  @Output() toggleCollected = new EventEmitter<void>();
  expanded = false;

  isCollected(b: BobbleheadObject) {
    return false;
  }

  toggleBobblehead(b: BobbleheadObject) {
    return;
  }
}
