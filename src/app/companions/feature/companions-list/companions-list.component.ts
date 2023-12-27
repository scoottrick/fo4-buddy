import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { SharedModule } from "src/app/_shared/shared.module";
import { CompanionService } from "src/app/checklists/data-access/companion.service";

@Component({
  selector: "fo-companions-list",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./companions-list.component.html",
  styles: ``,
})
export class CompanionsListComponent {
  private companionService = inject(CompanionService);

  companions = computed(() =>
    this.companionService
      .companions()
      .sort((a, b) => a.name.localeCompare(b.name))
  );
}
