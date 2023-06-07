import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

import { TextLinkComponent } from "./ui/text-link/text-link.component";
import { AppToolbarComponent } from "./ui/app-toolbar/app-toolbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { AppRoutingModule } from "../app-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [TextLinkComponent, AppToolbarComponent],
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatIconModule],
  exports: [
    TextLinkComponent,
    AppToolbarComponent,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class SharedModule {}
