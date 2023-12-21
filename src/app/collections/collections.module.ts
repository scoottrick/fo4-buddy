import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";

import { SharedModule } from "../_shared/shared.module";
import { CollectionsShellComponent } from "./feature/collections-shell/collections-shell.component";

@NgModule({
  declarations: [CollectionsShellComponent],
  imports: [CommonModule, SharedModule, MatTabsModule],
})
export class CollectionsModule {}
