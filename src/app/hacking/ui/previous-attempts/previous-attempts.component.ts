import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HackingAttempt } from "../../data-access/hacking-attempt";

@Component({
  selector: "fo-previous-attempts",
  templateUrl: "./previous-attempts.component.html",
  styles: [],
})
export class PreviousAttemptsComponent {
  @Input() attempts?: HackingAttempt[];

  @Output() attemptRemoved = new EventEmitter<HackingAttempt>();

  handleDeleteClicked(attempt: HackingAttempt) {
    this.attemptRemoved.emit(attempt);
  }
}
