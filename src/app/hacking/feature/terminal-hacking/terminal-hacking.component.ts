import { Component } from "@angular/core";
import { Observable, combineLatest, map, of } from "rxjs";

const samplePasswords = [
  "takes",
  "known",
  "kicks",
  "stark",
  "boots",
  "baton",
  "clear",
  "crime",
  "waste",
  "close",
  "sword",
  "slave",
  "fargo",
  "maybe",
  "males",
];

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

        <!-- guess chips -->
        <fo-guess-picker
          [passwords]="vm.passwords"
          (wordChanged)="changeActiveGuess($event)"
        ></fo-guess-picker>

        <fo-current-guess
          [word]="vm.activeGuess"
          (likenessChanged)="updateGuessLikeness($event)"
        ></fo-current-guess>

        <!-- previous guesses -->
        <ng-container>
          <ul>
            <ng-container *ngFor="let guess of vm.previousGuesses">
              <li class="flex flex-row items-center py-1 font-mono">
                <span class="grow">
                  > {{ guess.word }}
                  <br />
                  > Likeness: {{ guess.likeness }}
                </span>
                <button mat-icon-button color="warn">
                  <mat-icon fontIcon="delete"></mat-icon>
                </button>
              </li>
            </ng-container>
          </ul>
        </ng-container>
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
  private passwords$ = of(samplePasswords);
  private activeGuess$ = this.passwords$.pipe(map((passwords) => passwords[1]));
  private previousGuesses$: Observable<{ word: string; likeness: number }[]> =
    this.passwords$.pipe(
      map((passwords) => {
        return [
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

  addNewWords(words: string[]) {
    console.log("new words", words);
  }

  changeActiveGuess(word: string) {
    console.log("guess:", word);
  }

  updateGuessLikeness(n: number) {
    console.log("likeness:", n);
  }

  menuAction() {
    console.log("menu");
  }
}
