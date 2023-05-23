import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ChecklistShellComponent } from "./checklists/feature/checklist-shell/checklist-shell/checklist-shell.component";
import { TerminalHackingComponent } from "./hacking/feature/terminal-hacking/terminal-hacking.component";

const routes: Routes = [
  {
    path: "checklists",
    title: "Collections",
    component: ChecklistShellComponent,
  },
  {
    path: "hacking",
    title: "Terminal Hacking",
    component: TerminalHackingComponent,
  },
  { path: "**", redirectTo: "/checklists" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
