import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";

import { TerminalHackingComponent } from "./feature/terminal-hacking/terminal-hacking.component";

@NgModule({
  declarations: [TerminalHackingComponent],
  imports: [CommonModule, MatChipsModule],
})
export class HackingModule {}
