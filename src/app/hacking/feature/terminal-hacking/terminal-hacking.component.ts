import { Component, inject } from "@angular/core";
import { Observable, combineLatest, map, of } from "rxjs";
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

        <fo-password-picker
          [passwords]="vm.passwords"
          (wordSelected)="changeSelectedPassword($event)"
        ></fo-password-picker>

        <fo-current-attempt
          [attempt]="vm.currentAttempt"
          (attemptUpdated)="updateCurrentAttempt($event)"
          (attemptSubmitted)="addNewAttempt($event)"
        ></fo-current-attempt>

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
  private currentAttempt$: Observable<HackingAttempt> = this.passwords$.pipe(
    map((passwords) => ({ word: passwords[1], likeness: 0 }))
  );
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
    currentAttempt: this.currentAttempt$,
    previousGuesses: this.previousGuesses$,
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
