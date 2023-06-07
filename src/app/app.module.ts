import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HackingModule } from "./hacking/hacking.module";
import { ChecklistsModule } from "./checklists/checklists.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "./_shared/shared.module";
import { CollectionsModule } from "./collections/collections.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChecklistsModule,
    HackingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CollectionsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
