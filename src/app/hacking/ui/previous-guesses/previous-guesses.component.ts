import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "fo-previous-guesses",
  templateUrl: "./previous-guesses.component.html",
  styles: [],
})
export class PreviousGuessesComponent {
  @Input() guesses?: { word: string; likeness: number }[];
  @Output() guessDeleted = new EventEmitter<string>();

  handleDeleteClick(guess: { word: string; likeness: number }) {
    this.guessDeleted.emit(guess.word);
  }
}
