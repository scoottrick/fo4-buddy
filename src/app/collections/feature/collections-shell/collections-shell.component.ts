import { Component } from "@angular/core";

@Component({
  selector: "fo-collections-shell",
  template: `<main class="flex flex-col w-full h-full justify-center">
    <header>
      <fo-app-toolbar>
        Collections
        <span toolbar-controls>
          <a mat-icon-button routerLink="/hacking"
            ><mat-icon fontIcon="terminal"></mat-icon
          ></a>
        </span>
      </fo-app-toolbar>
    </header>
    <section class="shrink grow overflow-y-auto">
      <mat-tab-nav-panel #tabPanel>
        <div class="max-w-5xl my-0 mx-auto py-2 px-2 md:px-4">
          <router-outlet></router-outlet>
        </div>
      </mat-tab-nav-panel>
    </section>
    <footer>
      <nav mat-tab-nav-bar backgroundColor="primary" [tabPanel]="tabPanel">
        <ng-container *ngFor="let tab of tabs">
          <a
            mat-tab-link
            routerLinkActive
            #rla="routerLinkActive"
            [routerLink]="tab.link"
            [active]="rla.isActive"
            >{{ tab.text }}</a
          >
        </ng-container>
      </nav>
    </footer>
  </main> `,
  styles: [],
})
export class CollectionsShellComponent {
  tabs = <{ link: string; text: string }[]>[
    { link: "/collections/companions", text: "Companions" },
    { link: "/collections/bobbleheads", text: "Bobbleheads" },
    { link: "/collections/magazines", text: "Magazines" },
  ];
}
