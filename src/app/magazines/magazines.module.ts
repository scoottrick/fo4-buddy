import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../_shared/shared.module";
import { MagazinesListComponent } from "./feature/magazines-list.component";
import { MagazineListItemComponent } from "./feature/magazine-list-item.component";
import { IssueListItemComponent } from "./feature/issue-list-item.component";
import { IssueDetailsComponent } from "./feature/issue-details.component";
import { MagazinesService } from "./data-access/magazines.service";

@NgModule({
  declarations: [
    MagazinesListComponent,
    MagazineListItemComponent,
    IssueListItemComponent,
    IssueDetailsComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [MagazinesService],
})
export class MagazinesModule {}
