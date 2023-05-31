import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HackingAttempt } from "../../data-access/hacking-attempt";
import { FormControl, FormGroup, NgForm } from "@angular/forms";

@Component({
  selector: "fo-current-attempt",
  templateUrl: "./current-attempt.component.html",
  styles: [],
})
export class CurrentAttemptComponent {
  @Input() password?: string;

  @Output() attemptSubmitted = new EventEmitter<HackingAttempt>();

  attemptForm = new FormGroup({
    likeness: new FormControl("0", []),
  });

  handleSubmittedAttempt() {
    if (!this.password) {
      return;
    }
    const formData = this.attemptForm.value;
    const likeness = this.parseLikeness(formData.likeness || "");
    const word = this.password;
    if (!word || likeness < 0 || likeness > word.length) {
      return;
    }
    this.attemptSubmitted.next({ word, likeness });
  }

  private parseLikeness(input: string): number {
    const likeness = parseInt(input);
    if (isNaN(likeness)) {
      return -1;
    }
    return likeness;
  }
}
