import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BobbleheadChecklistComponent } from "./bobbleheads/feature/bobblehead-checklist/bobblehead-checklist.component";
import { BobbleheadService } from "./bobbleheads/data-access/bobblehead.service";
import { MagazineChecklistComponent } from "./magazines/feature/magazine-checklist/magazine-checklist.component";
import { MagazineService } from "./magazines/data-access/magazine.service";

@NgModule({
  declarations: [
    AppComponent,
    BobbleheadChecklistComponent,
    MagazineChecklistComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [BobbleheadService, MagazineService],
  bootstrap: [AppComponent],
})
export class AppModule {}
