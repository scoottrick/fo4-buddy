import { Component } from "@angular/core";

@Component({
  selector: "fo-root",
  template: `
    <div class="text-center font-bold">
      <h1>Welcome to {{ title }}!</h1>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "fo4-buddy";
}
