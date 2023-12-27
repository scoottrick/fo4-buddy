import { CommonModule } from "@angular/common";
import { Component, OnInit, computed, inject } from "@angular/core";
import { SharedModule } from "src/app/_shared/shared.module";
import { CompanionService } from "src/app/checklists/data-access/companion.service";

@Component({
  selector: "fo-companions-list",
  templateUrl: "./companions-list.component.html",
  styles: ``,
})
export class CompanionsListComponent implements OnInit {
  private companionService = inject(CompanionService);

  companions = computed(() =>
    this.companionService
      .companions()
      .sort((a, b) => a.name.localeCompare(b.name))
  );

  ngOnInit(): void {
    this.companionService.fetchData();
  }
}
