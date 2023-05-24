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
          <mat-toolbar-row class="flex flex-row">
            <span class="grow">Collections</span>
            <nav>
              <button mat-icon-button routerLink="/hacking">
                <mat-icon fontIcon="terminal"></mat-icon>
              </button>
              <button mat-icon-button routerLink="/checklists">
                <mat-icon fontIcon="checklist"></mat-icon>
              </button>
              <button mat-icon-button>
                <mat-icon fontIcon="settings"></mat-icon>
              </button>
            </nav>
          </mat-toolbar-row>
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
