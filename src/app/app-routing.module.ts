import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TerminalHackingComponent } from "./hacking/feature/terminal-hacking/terminal-hacking.component";
import { CollectionsShellComponent } from "./collections/feature/collections-shell/collections-shell.component";
import { BobbleheadChecklistComponent } from "./checklists/feature/bobblehead-checklist/bobblehead-checklist.component";
import { MagazineChecklistComponent } from "./checklists/feature/magazine-checklist/magazine-checklist.component";

const routes: Routes = [
  {
    path: "hacking",
    title: "Terminal Hacking",
    component: TerminalHackingComponent,
  },
  {
    path: "collections",
    title: "Collections",
    component: CollectionsShellComponent,
    children: [
      {
        path: "bobbleheads",
        title: "Bobbleheads",
        component: BobbleheadChecklistComponent,
      },
      {
        path: "magazines",
        title: "Magazines",
        component: MagazineChecklistComponent,
      },
      { path: "**", redirectTo: "/collections/bobbleheads" },
    ],
  },
  { path: "**", redirectTo: "/collections" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
