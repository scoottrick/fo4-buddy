import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";

import { TerminalHackingComponent } from "./feature/terminal-hacking/terminal-hacking.component";
import { NewPasswordsComponent } from './ui/new-passwords/new-passwords.component';
import { GuessPickerComponent } from './ui/guess-picker/guess-picker.component';

@NgModule({
  declarations: [TerminalHackingComponent, NewPasswordsComponent, GuessPickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
  ],
})
export class HackingModule {}
