import { Component } from "@angular/core";

@Component({
  selector: "fo-collections-shell",
  templateUrl: "./collections-shell.component.html",
  styles: [],
})
export class CollectionsShellComponent {
  tabs = <{ link: string; text: string }[]>[
    { link: "/collections/bobbleheads", text: "Bobbleheads" },
    { link: "/collections/magazines", text: "Magazines" },
  ];
}
