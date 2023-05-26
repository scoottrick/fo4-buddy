import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "fo-current-guess",
  templateUrl: "./current-guess.component.html",
  styles: [],
})
export class CurrentGuessComponent {
  @Input() word?: string;

  @Output() likenessChanged = new EventEmitter<number>();

  handleSubmittedGuess() {}

  handleChangedLikeness(event: Event) {
    if ((event as any).target.value) {
      this.likenessChanged.emit(0);
    }
  }
}
