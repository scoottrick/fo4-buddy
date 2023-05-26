import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "fo-new-passwords",
  template: `
    <ng-container>
      <div class="mb-4">
        <form #addWordsForm (ngSubmit)="handleSubmit($event)">
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
  `,
  styles: [],
})
export class NewPasswordsComponent {
  @Output() wordsAdded = new EventEmitter<string[]>();

  handleSubmit(event: Event) {
    const words: string[] = [];
    this.wordsAdded.emit(words);
  }
}
