import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

import { TextLinkComponent } from "./ui/text-link/text-link.component";
import { AppToolbarComponent } from "./ui/app-toolbar/app-toolbar.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { MatExpansionModule } from "@angular/material/expansion";
import { WikiUrlPipe } from "./pipes/wiki-url.pipe";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [TextLinkComponent, AppToolbarComponent, WikiUrlPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    TextLinkComponent,
    AppToolbarComponent,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    RouterModule,
    WikiUrlPipe,
  ],
})
export class SharedModule {}
