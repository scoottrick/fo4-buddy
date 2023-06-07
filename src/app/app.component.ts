import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "fo-root",
  template: `
    <div class="mat-app-background fixed top-0 bottom-0 left-0 right-0">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
