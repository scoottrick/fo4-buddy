import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatChipListboxChange } from "@angular/material/chips";

@Component({
  selector: "fo-password-picker",
  templateUrl: "./password-picker.component.html",
  styles: [],
})
export class PasswordPickerComponent {
  @Input() passwords?: string[];
  @Input() selectedWord?: string;

  @Output() wordSelected = new EventEmitter<string>();

  handleChange(event: MatChipListboxChange) {
    this.wordSelected.emit(<string>event.value);
  }
}
