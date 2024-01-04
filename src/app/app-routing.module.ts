import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TerminalHackingComponent } from "./hacking/feature/terminal-hacking/terminal-hacking.component";
import { CollectionsShellComponent } from "./collections/feature/collections-shell/collections-shell.component";
import { CompanionsListComponent } from "./companions/feature/companions-list/companions-list.component";
import { MagazinesListComponent } from "./magazines/feature/magazines-list.component";
import { BobbleheadsListComponent } from "./bobbleheads/feature/bobbleheads-list.component";
import { CharactersPageComponent } from "./characters/characters-page/characters-page.component";

const routes: Routes = [
  {
    path: "hacking",
    title: "Terminal Hacking",
    component: TerminalHackingComponent,
  },
  {
    path: "characters",
    title: "Characters",
    component: CharactersPageComponent,
  },
  {
    path: "collections",
    title: "Collections",
    component: CollectionsShellComponent,
    children: [
      {
        path: "bobbleheads",
        title: "Bobbleheads",
        component: BobbleheadsListComponent,
      },
      {
        path: "magazines",
        title: "Magazines",
        component: MagazinesListComponent,
      },
      {
        path: "companions",
        title: "Companions",
        component: CompanionsListComponent,
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
