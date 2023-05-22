import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { ChecklistShellComponent } from "./feature/checklist-shell/checklist-shell/checklist-shell.component";
import { BobbleheadChecklistComponent } from "./feature/bobblehead-checklist/bobblehead-checklist.component";
import { MagazineChecklistComponent } from "./feature/magazine-checklist/magazine-checklist.component";

@NgModule({
  declarations: [
    ChecklistShellComponent,
    BobbleheadChecklistComponent,
    MagazineChecklistComponent,
  ],
  imports: [CommonModule, RouterModule, HttpClientModule],
})
export class ChecklistsModule {}
