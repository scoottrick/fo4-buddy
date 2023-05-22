import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "fo-checkbox-item",
  template: `
    <div
      (click)="toggle.emit()"
      role="checkbox"
      class="flex flex-row justify-between"
    >
      <div class="grow self-stretch"><ng-content></ng-content></div>
      <div
        class="flex-none w-10 h-10 self-center p-1 border-2 border-slate-800"
      >
        <div *ngIf="checked" class="bg-slate-800 w-full h-full"></div>
      </div>
    </div>
  `,
  styles: [],
})
export class CheckboxItemComponent {
  @Input() checked = false;
  @Output() toggle = new EventEmitter<void>();
}
