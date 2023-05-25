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
      <div></div>
      <div class="p-4 max-w-xl mx-auto">
        <mat-chip-listbox>
          <ng-container *ngFor="let word of passwords$ | async">
            <mat-chip>
              <span class="font-mono">{{ word }}</span>
            </mat-chip>
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
        align-items: center;
      }
    `,
  ],
})
export class TerminalHackingComponent {
  passwords$ = of(samplePasswords);
}
