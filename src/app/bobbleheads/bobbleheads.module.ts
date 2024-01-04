import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../_shared/shared.module";
import { BobbleheadsListComponent } from "./feature/bobbleheads-list.component";
import { BobbleheadsService } from "./data-access/bobbleheads.service";
import { BobbleheadListItemComponent } from "./feature/bobblehead-list-item.component";
import {
  BobbleheadCollectionStatsComponent,
  StatItemComponent,
} from "./feature/bobblehead-collection-stats.component";

@NgModule({
  declarations: [
    BobbleheadsListComponent,
    BobbleheadListItemComponent,
    BobbleheadCollectionStatsComponent,
    StatItemComponent,
  ],
  providers: [BobbleheadsService],
  imports: [CommonModule, SharedModule],
})
export class BobbleheadsModule {}
