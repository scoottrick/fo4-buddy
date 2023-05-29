import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HackingAttempt } from "../../data-access/hacking-attempt";

@Component({
  selector: "fo-previous-guesses",
  templateUrl: "./previous-guesses.component.html",
  styles: [],
})
export class PreviousGuessesComponent {
  @Input() guesses?: HackingAttempt[];
  @Output() guessDeleted = new EventEmitter<string>();

  handleDeleteClick(guess: HackingAttempt) {
    this.guessDeleted.emit(guess.word);
  }
}
