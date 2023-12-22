import { Component, OnInit, inject } from "@angular/core";
import { CompanionService } from "src/app/checklists/data-access/companion.service";

@Component({
  selector: "fo-collections-shell",
  templateUrl: "./collections-shell.component.html",
  styles: [],
})
export class CollectionsShellComponent implements OnInit {
  private companionService = inject(CompanionService);

  ngOnInit() {
    this.companionService.fetchData();
  }

  tabs = <{ link: string; text: string }[]>[
    { link: "/collections/bobbleheads", text: "Bobbleheads" },
    { link: "/collections/magazines", text: "Magazines" },
  ];
}
