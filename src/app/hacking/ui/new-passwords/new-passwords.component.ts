import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "fo-new-passwords",
  templateUrl: "./new-passwords.component.html",
  styles: [],
})
export class NewPasswordsComponent {
  @Output() wordsAdded = new EventEmitter<string[]>();

  handleSubmit(event: Event) {
    const words: string[] = [];
    this.wordsAdded.emit(words);
  }
}
