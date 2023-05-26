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
        <!-- add words form -->
        <ng-container>
          <div class="mb-4">
            <form #addWordsForm (ngSubmit)="addWords($event)">
              <mat-form-field class="w-full" color="accent">
                <mat-label>Terminal passwords</mat-label>
                <input matInput type="text" placeholder="" />
                <mat-hint
                  >Enter the passwords from the in-game terminal separated by
                  spaces.</mat-hint
                >
                <button type="submit" matSuffix mat-icon-button color="accent">
                  <mat-icon fontIcon="add"></mat-icon>
                </button>
              </mat-form-field>
            </form>
          </div>
        </ng-container>

        <!-- guess chips -->
        <ng-container>
          <div class="py-4">
            <mat-chip-listbox>
              <ng-container *ngFor="let word of vm.passwords">
                <mat-chip-option color="accent" class="font-mono">
                  {{ word }}
                </mat-chip-option>
              </ng-container>
            </mat-chip-listbox>
          </div>
        </ng-container>

        <!-- guess maker -->
        <ng-container>
          <div class="guess py-8 max-w-md mx-auto text-center">
            <h1 class="text-center font-mono">{{ vm.activeGuess }}</h1>
            <div class="text-center p-4">
              <mat-form-field color="accent">
                <mat-label>Likeness</mat-label>
                <input
                  matInput
                  inputmode="numeric"
                  min="0"
                  [max]="vm.activeGuess.length"
                  maxlength="2"
                  value="0"
                  class="text-center"
                />
              </mat-form-field>
              <div class="text-center">
                <button mat-flat-button color="accent">
                  <mat-icon fontIcon="add"></mat-icon>
                  Add Guess
                </button>
              </div>
            </div>
          </div>
        </ng-container>

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
      ::ng-deep .mdc-evolution-chip-set__chips {
        justify-content: space-evenly;
        row-gap: 1em;
      }

      .guess ::ng-deep .mat-mdc-form-field-infix {
        width: auto;
        min-width: 12em;
        text-align: center;
      }

      .font-mono {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          "Liberation Mono", "Courier New", monospace;
      }

      .guess h1 {
        font-size: 36px;
      }
    `,
  ],
})
export class TerminalHackingComponent {
  private passwords$ = of(samplePasswords);
  private activeGuess$ = this.passwords$.pipe(map((passwords) => passwords[0]));
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

  addWords(event: Event) {
    console.log(event);
  }

  menuAction() {
    console.log("menu");
  }
}
