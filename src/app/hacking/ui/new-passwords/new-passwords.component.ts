import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";

@Component({
  selector: "fo-new-passwords",
  templateUrl: "./new-passwords.component.html",
  styles: [],
})
export class NewPasswordsComponent {
  @Output() wordsAdded = new EventEmitter<string[]>();

  newWordsForm = new FormGroup({
    wordInput: new FormControl("", [this.wordsAreValid()]),
  });

  handleSubmit() {
    if (!this.newWordsForm.valid) {
      return;
    }
    const inputString = this.newWordsForm.value.wordInput || "";
    const words: string[] = splitIntoWords(
      this.newWordsForm.value.wordInput || ""
    );

    const errors = checkForErrors(inputString);
    if (!errors) {
      return;
    }

    this.wordsAdded.emit(words);
  }

  private wordsAreValid(): ValidatorFn {
    return (control: AbstractControl) => {
      return checkForErrors(control.value);
    };
  }
}

function checkForErrors(
  input: string
): { emptyInput?: boolean; differingLengths?: boolean } | null {
  const words: string[] = splitIntoWords(input);
  if (!words.length) {
    return { emptyInput: true };
  }
  const targetLength = words[0].length;
  const areEqualLength = words.every((w) => w.length === targetLength);
  if (!areEqualLength) {
    return { differingLengths: true };
  }
  return null;
}

function splitIntoWords(input: string = "") {
  return input.replace(/\s/g, ";").split(";");
}
