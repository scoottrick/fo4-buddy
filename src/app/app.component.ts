import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "fo-root",
  template: `
    <main
      class="mat-app-background flex flex-col fixed top-0 bottom-0 left-0 right-0"
    >
      <header>
        <mat-toolbar color="primary">
          <mat-toolbar-row>Collections</mat-toolbar-row>
        </mat-toolbar>
      </header>
      <section class="flex flex-col grow overflow-hidden">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styles: [],
})
export class AppComponent {}
