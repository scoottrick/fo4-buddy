import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../_shared/shared.module";
import { CompanionsService } from "./data-access/companions.service";
import { CompanionsListComponent } from "./feature/companions-list/companions-list.component";

@NgModule({
  declarations: [CompanionsListComponent],
  imports: [CommonModule, SharedModule],
  providers: [CompanionsService],
})
export class CompanionsModule {}
