import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BobbleheadChecklistComponent } from "./checklists/feature/bobblehead-checklist/bobblehead-checklist.component";
import { MagazineChecklistComponent } from "./checklists/feature/magazine-checklist/magazine-checklist.component";
import { ChecklistShellComponent } from "./checklists/feature/checklist-shell/checklist-shell/checklist-shell.component";
import { TerminalHackingComponent } from "./hacking/feature/terminal-hacking/terminal-hacking.component";

const routes: Routes = [
  {
    path: "checklists",
    component: ChecklistShellComponent,
    children: [
      { path: "bobbleheads", component: BobbleheadChecklistComponent },
      { path: "magazines", component: MagazineChecklistComponent },
      { path: "**", redirectTo: "/checklists/bobbleheads" },
    ],
  },
  { path: "hacking", component: TerminalHackingComponent },
  { path: "**", redirectTo: "/checklists" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
