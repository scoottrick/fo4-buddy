import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatChipListboxChange } from "@angular/material/chips";

@Component({
  selector: "fo-guess-picker",
  templateUrl: "./guess-picker.component.html",
  styles: [
    `
      ::ng-deep .mdc-evolution-chip-set__chips {
        justify-content: center;
      }
    `,
  ],
})
export class GuessPickerComponent {
  @Input() passwords?: string[];
  @Input() selectedWord?: string;
  @Output() wordChanged = new EventEmitter<string>();

  handleChange(event: MatChipListboxChange) {
    this.wordChanged.emit(event.value);
  }
}
