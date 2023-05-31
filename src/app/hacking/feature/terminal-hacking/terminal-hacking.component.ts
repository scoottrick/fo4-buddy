import { Component, inject } from "@angular/core";

import { HackingAttempt } from "../../data-access/hacking-attempt";
import { TerminalHackingService } from "../../data-access/terminal-hacking.service";

const samplePasswordString = () =>
  "takes known kicks stark boots baton clear crime waste close sword slave fargo maybe males";
const samplePasswords = () => samplePasswordString().split(" ");

interface ViewModel {
  passwords: string[];
  selectedPassword: string | undefined;
  previousAttempts: HackingAttempt[];
  availablePasswords: string[];
}

@Component({
  selector: "fo-terminal-hacking",
  templateUrl: "./terminal-hacking.component.html",
  styles: [
    `
      .guess ::ng-deep .mat-mdc-form-field-infix {
        width: auto;
        min-width: 12em;
        text-align: center;
      }

      .guess h1 {
        font-size: 36px;
      }
    `,
  ],
})
export class TerminalHackingComponent {
  private hackingService = inject(TerminalHackingService);

  vm: ViewModel = {
    passwords: [],
    selectedPassword: undefined,
    previousAttempts: [],
    availablePasswords: [],
  };

  private updateView(updates: Partial<ViewModel>) {
    if (updates.passwords || updates.previousAttempts) {
      const passwords = updates.passwords || this.vm.passwords;
      const attempts = updates.previousAttempts || this.vm.previousAttempts;
      const availablePasswords = this.hackingService.filterAvailablePasswords(
        passwords,
        attempts
      );
      const maintainSelection =
        this.vm.selectedPassword &&
        availablePasswords.includes(this.vm.selectedPassword);
      const selectedPassword = maintainSelection
        ? this.vm.selectedPassword
        : availablePasswords[0];
      updates.availablePasswords = availablePasswords;
      updates.selectedPassword = selectedPassword;
    }

    this.vm = { ...this.vm, ...updates };
  }

  addPasswords(newWords: string[]) {
    const uniquePasswords = new Set([...this.vm.passwords, ...newWords]);
    const passwords = Array.from(uniquePasswords);
    this.updateView({
      passwords,
    });
  }

  changeSelectedPassword(word: string) {
    this.updateView({ selectedPassword: word });
  }

  addNewAttempt(attempt: HackingAttempt) {
    const previousAttempts = [...this.vm.previousAttempts, attempt];
    this.updateView({ previousAttempts });
  }

  removeHackingAttempt(attempt: HackingAttempt) {
    const previousAttempts = this.vm.previousAttempts.filter((a) => {
      return a.word !== attempt.word;
    });
    this.updateView({ previousAttempts });
  }

  clearPasswords() {
    this.updateView({
      passwords: [],
      selectedPassword: undefined,
      availablePasswords: [],
      previousAttempts: [],
    });
  }

  clearPreviousAttempts() {
    this.updateView({
      previousAttempts: [],
      availablePasswords: [...this.vm.passwords],
      selectedPassword: this.vm.passwords[0],
    });
  }
}
