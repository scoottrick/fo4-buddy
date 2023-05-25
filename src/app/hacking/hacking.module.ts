import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { TerminalHackingComponent } from "./feature/terminal-hacking/terminal-hacking.component";

@NgModule({
  declarations: [TerminalHackingComponent],
  imports: [CommonModule, MatChipsModule, MatFormFieldModule, MatInputModule],
})
export class HackingModule {}
