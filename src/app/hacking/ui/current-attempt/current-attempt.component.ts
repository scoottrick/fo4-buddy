import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HackingAttempt } from "../../data-access/hacking-attempt";

@Component({
  selector: "fo-current-attempt",
  templateUrl: "./current-attempt.component.html",
  styles: [],
})
export class CurrentAttemptComponent {
  @Input() attempt?: HackingAttempt;

  @Output() attemptSubmitted = new EventEmitter<HackingAttempt>();
  @Output() attemptUpdated = new EventEmitter<HackingAttempt>();

  handleSubmittedAttempt() {
    if (this.attempt) {
      this.attemptSubmitted.next(this.attempt);
    }
  }

  handleChangedLikeness(event: any) {
    if (!this.attempt) {
      return;
    }
    const word = this.attempt.word;
    const likenessInput = event.target.value;
    const likeness = parseInt(likenessInput);
    const isInvalidLikeness =
      isNaN(likeness) || likeness < 0 || likeness > word.length;
    if (isInvalidLikeness) {
      return;
    }
    this.attemptUpdated.next({ word, likeness });
  }
}
