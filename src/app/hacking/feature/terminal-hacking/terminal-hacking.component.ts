import { Component } from "@angular/core";
import { of } from "rxjs";

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
  // "males",
];

@Component({
  selector: "fo-terminal-hacking",
  template: `
    <ng-container>
      <h1>terminal-hacking works!</h1>
      <div class="p-4">
        <mat-form-field class="w-full" color="accent">
          <mat-label>Terminal passwords</mat-label>
          <input matInput type="text" placeholder="" />
          <mat-hint
            >Enter the passwords from the in-game terminal separated by
            spaces.</mat-hint
          >
        </mat-form-field>
      </div>
      <div class="p-4 max-w-xl mx-auto">
        <mat-chip-listbox>
          <ng-container *ngFor="let word of passwords$ | async">
            <mat-chip-option
              color="accent"
              [selected]="word === 'takes'"
              class="font-mono"
            >
              {{ word }}
            </mat-chip-option>
          </ng-container>
        </mat-chip-listbox>
      </div>
    </ng-container>
  `,
  styles: [
    `
      ::ng-deep .mdc-evolution-chip-set__chips {
        justify-content: space-evenly;
        row-gap: 1em;
      }
    `,
  ],
})
export class TerminalHackingComponent {
  passwords$ = of(samplePasswords);
}
