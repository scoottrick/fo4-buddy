import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";

import { ChecklistShellComponent } from "./feature/checklist-shell/checklist-shell/checklist-shell.component";
import { BobbleheadChecklistComponent } from "./feature/bobblehead-checklist/bobblehead-checklist.component";
import { MagazineChecklistComponent } from "./feature/magazine-checklist/magazine-checklist.component";
import { CheckboxItemModule } from "../_shared/ui/checkbox-item/checkbox-item.module";
import { MagazineListItemComponent } from "./feature/magazine-checklist/magazine-list-item.component";
import {
  BobbleheadListItem,
  TextLinkComponent,
} from "./feature/bobblehead-checklist/bobblehead-list-item.component";
import { CardComponent } from "../_shared/ui/card/card.component";

@NgModule({
  declarations: [
    ChecklistShellComponent,
    BobbleheadChecklistComponent,
    BobbleheadListItem,
    MagazineChecklistComponent,
    MagazineListItemComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CheckboxItemModule,
    CardComponent,
    TextLinkComponent,
    MatTabsModule,
    MatExpansionModule,
  ],
})
export class ChecklistsModule {}
