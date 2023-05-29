import { Component, inject } from "@angular/core";
import { combineLatest, map } from "rxjs";

import { HackingAttempt } from "../../data-access/hacking-attempt";
import { TerminalHackingService } from "../../data-access/terminal-hacking.service";

const samplePasswordString =
  "takes known kicks stark boots baton clear crime waste close sword slave fargo maybe males";

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

  private passwords$ = this.hackingService.terminalPasswords$;
  private currentAttempt$ = this.passwords$.pipe(
    map((passwords) => {
      if (passwords.length) {
        return <HackingAttempt>{ word: passwords[0], likeness: 0 };
      }
      return undefined;
    })
  );
  private previousAttempts$ = this.hackingService.hackingAttempts$;

  vm$ = combineLatest({
    passwords: this.passwords$,
    currentAttempt: this.currentAttempt$,
    previousAttempts: this.previousAttempts$,
  });

  ngOnInit(): void {
    this.hackingService.init();
  }

  addNewWords(words: string[]) {
    console.log("new words", words);
    this.hackingService.addNewPasswords(words);
  }

  changeSelectedPassword(word: string) {
    console.log("select password:", word);
  }

  updateCurrentAttempt(attempt: HackingAttempt) {
    console.log("update attempt:", attempt);
  }

  addNewAttempt(attempt: HackingAttempt) {
    console.log("add attempt:", attempt);
  }

  removeHackingAttempt(attempt: HackingAttempt) {
    console.log("remove attempt:", attempt);
  }

  menuAction() {
    console.log("menu");
  }
}
