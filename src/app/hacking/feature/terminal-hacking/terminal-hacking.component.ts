import { Component, inject } from "@angular/core";
import { combineLatest, map, of } from "rxjs";
import { HackingAttempt } from "../../data-access/hacking-attempt";
import { TerminalHackingService } from "../../data-access/terminal-hacking.service";

@Component({
  selector: "fo-terminal-hacking",
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="text-right">
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon fontIcon="more_horiz"></mat-icon>
        </button>
        <mat-menu #menu>
          <button mat-menu-item (click)="menuAction()">Reset all</button>
          <button mat-menu-item (click)="menuAction()">Clear guesses</button>
        </mat-menu>
      </div>

      <div class="max-w-2xl mx-auto pb-4 px-4">
        <fo-new-passwords (wordsAdded)="addNewWords($event)"></fo-new-passwords>

        <fo-guess-picker
          [passwords]="vm.passwords"
          (wordChanged)="changeActiveGuess($event)"
        ></fo-guess-picker>

        <fo-current-guess
          [word]="vm.activeGuess"
          (likenessChanged)="updateGuessLikeness($event)"
        ></fo-current-guess>

        <fo-previous-attempts
          [attempts]="vm.previousGuesses"
          (attemptRemoved)="removeHackingAttempt($event)"
        >
        </fo-previous-attempts>
      </div>
    </ng-container>
  `,
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
  private activeGuess$ = this.passwords$.pipe(map((passwords) => passwords[1]));
  private previousGuesses$ = this.passwords$.pipe(
    map((passwords) => {
      return <HackingAttempt[]>[
        { word: passwords[0], likeness: 3 },
        { word: passwords[1], likeness: 1 },
      ];
    })
  );

  vm$ = combineLatest({
    passwords: this.passwords$,
    activeGuess: this.activeGuess$,
    previousGuesses: this.previousGuesses$,
  });

  ngOnInit(): void {
    this.hackingService.init();
  }

  addNewWords(words: string[]) {
    console.log("new words", words);
    this.hackingService.addNewPasswords(words);
  }

  changeActiveGuess(word: string) {
    console.log("guess:", word);
  }

  updateGuessLikeness(n: number) {
    console.log("likeness:", n);
  }

  addNewGuess(word: string, likeness: number) {
    console.log("new guess:", { word, likeness });
  }

  removeHackingAttempt(attempt: HackingAttempt) {
    console.log("remove attempt:", attempt);
  }

  menuAction() {
    console.log("menu");
  }
}
