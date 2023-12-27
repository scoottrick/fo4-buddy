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

@NgModule({
  declarations: [TextLinkComponent, AppToolbarComponent, WikiUrlPipe],
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatIconModule],
  exports: [
    TextLinkComponent,
    AppToolbarComponent,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule,
    WikiUrlPipe,
  ],
})
export class SharedModule {}
