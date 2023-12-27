import { CommonModule } from "@angular/common";
import { Component, OnInit, computed, inject } from "@angular/core";
import { SharedModule } from "src/app/_shared/shared.module";
import { CompanionsService } from "../../data-access/companions.service";

@Component({
  selector: "fo-companions-list",
  template: `<ul>
    <li class="mb-2 last:mb-0" *ngFor="let companion of companions()">
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title
            ><ng-container
              ><span class="text-xl">{{ companion.name }}</span></ng-container
            ></mat-panel-title
          >
        </mat-expansion-panel-header>
        <ng-container>
          <div *ngIf="companion.perk">
            <div>
              Perk:
              <fo-text-link
                [href]="companion.perk.url | wikiUrl"
                [text]="companion.perk.name"
              />
            </div>
          </div>
          <div class="text-xs mt-2">
            <div class="text-gray-200">Possible Locations</div>
            <ul>
              <li *ngFor="let location of companion.locations">
                <fo-text-link
                  text="{{ location.name }}"
                  href="{{ location.url | wikiUrl }}"
                />
              </li>
            </ul>
          </div>
          <div class="text-xs mt-2">
            <div class="text-gray-200">Requirements</div>
            <div>{{ companion.requirements }}</div>
          </div>
          <div class="text-xs mt-2">
            <div class="text-gray-200">SPECIAL</div>
            <ul>
              <li *ngFor="let stat of companion.specials">
                <span class="mr-2">S: {{ stat.strength }}</span
                ><span class="mr-2">P: {{ stat.perception }}</span
                ><span class="mr-2">E: {{ stat.endurance }}</span
                ><span class="mr-2">C: {{ stat.charisma }}</span
                ><span class="mr-2">I: {{ stat.intelligence }}</span
                ><span class="mr-2">A: {{ stat.agility }}</span
                ><span>L: {{ stat.luck }}</span>
              </li>
            </ul>
          </div>
          <div *ngIf="companion.quest" class="text-xs mt-1">
            <div class="text-gray-200">Quest</div>
            <div>{{ companion.quest.name }}</div>
            <div>
              <fo-text-link
                text="Quest Info"
                href="{{ companion.quest.url | wikiUrl }}"
              />
            </div>
          </div>
          <div *ngIf="companion.interestsUrl" class="text-sm mt-1">
            <fo-text-link
              text="Likes/Dislikes"
              href="{{ companion.url + companion.interestsUrl | wikiUrl }}"
            />
          </div>
        </ng-container>
      </mat-expansion-panel>
    </li>
  </ul> `,
  styles: ``,
})
export class CompanionsListComponent implements OnInit {
  private companionService = inject(CompanionsService);

  companions = computed(() =>
    this.companionService
      .companions()
      .sort((a, b) => a.name.localeCompare(b.name))
  );

  ngOnInit(): void {
    this.companionService.fetchData();
  }
}
