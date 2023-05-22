import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HackingModule } from "./hacking/hacking.module";
import { ChecklistsModule } from "./checklists/checklists.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ChecklistsModule, HackingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
