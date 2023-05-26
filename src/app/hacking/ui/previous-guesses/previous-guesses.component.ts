import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TerminalGuess } from "../../data-access/terminal-guess";

@Component({
  selector: "fo-previous-guesses",
  templateUrl: "./previous-guesses.component.html",
  styles: [],
})
export class PreviousGuessesComponent {
  @Input() guesses?: TerminalGuess[];
  @Output() guessDeleted = new EventEmitter<string>();

  handleDeleteClick(guess: TerminalGuess) {
    this.guessDeleted.emit(guess.word);
  }
}
