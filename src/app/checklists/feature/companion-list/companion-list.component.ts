import { Component, computed, inject } from "@angular/core";
import { combineLatest } from "rxjs";
import { CompanionService } from "../../data-access/companion.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "fo-companion-list",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let companion of vm().companions">{{ companion.name }}</li>
    </ul>
  `,
  styles: ``,
})
export class CompanionListComponent {
  private companionService = inject(CompanionService);
  vm = computed(() => ({
    companions: this.companionService.companions(),
  }));
}
