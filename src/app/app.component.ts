import { Component } from "@angular/core";

@Component({
  selector: "fo-root",
  template: `
    <main
      class="fixed top-0 bottom-0 left-0 right-0 flex flex-col bg-stone-700"
    >
      <section class="flex-grow overflow-y-scroll">
        <router-outlet></router-outlet>
      </section>

      <section class="flex-none h-16 bg-slate-700 text-white">
        <nav>
          <ul class="flex flex-row justify-between gap-4">
            <li class="flex-1 text-center">
              <a routerLink="/checklists">Collections</a>
            </li>
            <li class="flex-1 text-center">
              <a routerLink="/hacking">Hacking</a>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  `,
  styles: [],
})
export class AppComponent {}
