import { Component, computed, inject } from "@angular/core";
import { CompanionService } from "../../data-access/companion.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "fo-companion-list",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li class="py-4 px-8" *ngFor="let companion of companions()">
        <div class="text-xl">{{ companion.name }}</div>
        <div *ngIf="companion.perk && companion.perk.name !== '-'">
          <div>Perk: {{ companion.perk.name }}</div>
          <div>{{ companion.perk.url }}</div>
        </div>
        <div class="text-xs mt-1">
          <div class="text-gray-200">Possible Locations</div>
          <ul>
            <li *ngFor="let location of companion.locations">
              - {{ location.name }}
            </li>
          </ul>
        </div>
        <div class="text-xs mt-1">
          <div class="text-gray-200">Prerequistes</div>
          <div>{{ companion.prereq }}</div>
        </div>
        <div class="text-xs mt-1">
          <div class="text-gray-200">SPECIAL</div>
          <ul>
            <li *ngFor="let stat of companion.specials">
              <span class="p-2">S: {{ stat.strength }}</span
              ><span class="p-2">P: {{ stat.perception }}</span
              ><span class="p-2">E: {{ stat.endurance }}</span
              ><span class="p-2">C: {{ stat.charisma }}</span
              ><span class="p-2">I: {{ stat.intelligence }}</span
              ><span class="p-2">A: {{ stat.agility }}</span
              ><span class="p-2">L: {{ stat.luck }}</span>
            </li>
          </ul>
        </div>
        <div *ngIf="companion.quest" class="text-xs mt-1">
          <div class="text-gray-200">Quest</div>
          <div>{{ companion.quest.name }}</div>
        </div>
      </li>
    </ul>
  `,
  styles: ``,
})
export class CompanionListComponent {
  private companionService = inject(CompanionService);

  companions = computed(() =>
    this.companionService
      .companions()
      .sort((a, b) => a.name.localeCompare(b.name))
  );
}
