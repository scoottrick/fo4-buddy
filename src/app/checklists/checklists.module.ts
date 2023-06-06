import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";

import { ChecklistShellComponent } from "./feature/checklist-shell/checklist-shell.component";
import { BobbleheadChecklistComponent } from "./feature/bobblehead-checklist/bobblehead-checklist.component";
import { MagazineChecklistComponent } from "./feature/magazine-checklist/magazine-checklist.component";
import { CheckboxItemModule } from "../_shared/ui/checkbox-item/checkbox-item.module";
import { MagazineListItemComponent } from "./feature/magazine-checklist/magazine-list-item.component";
import { BobbleheadListItem } from "./feature/bobblehead-checklist/bobblehead-list-item.component";
import { IssueListItemComponent } from "./feature/magazine-checklist/issue-list-item.component";
import { IssueDetailsComponent } from "./feature/magazine-checklist/issue-details.component";
import { SharedModule } from "../_shared/shared.module";

@NgModule({
  declarations: [
    ChecklistShellComponent,
    BobbleheadChecklistComponent,
    BobbleheadListItem,
    MagazineChecklistComponent,
    MagazineListItemComponent,
    IssueListItemComponent,
    IssueDetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CheckboxItemModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    SharedModule,
  ],
})
export class ChecklistsModule {}
