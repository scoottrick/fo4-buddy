import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "fo-card",
  standalone: true,
  imports: [CommonModule],
  template: `<div class="bg-stone-800 rounded-md text-gray-100 p-4">
    <ng-content></ng-content>
  </div>`,
})
export class CardComponent {}
