import { CommonModule } from "@angular/common";
import { Component, OnInit, computed, inject } from "@angular/core";
import {
  CharacterInfo,
  CharacterService,
} from "src/app/_shared/data-access/character.service";

type RichCharacterInfo = CharacterInfo & {
  bobbleheadCount: number;
  magazineCount: number;
  isActive: boolean;
};

@Component({
  selector: "fo-characters-page",
  standalone: true,
  providers: [CharacterService],
  imports: [CommonModule],
  template: `<ng-container>
    <h1>Manage Characters</h1>
    <ul>
      <li *ngFor="let character of characters()">
        <h3>
          {{ character.name }}
          <span class="ml-2" *ngIf="character.isActive">*</span>
        </h3>
        <p>
          Bobbleheads: {{ character.bobbleheadCount }} | Magazines:
          {{ character.magazineCount }}
        </p>
        <div>
          <button
            *ngIf="canDeleteCharacters()"
            (click)="deleteCharacter(character)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </ng-container>`,
  styles: ``,
})
export class CharactersPageComponent implements OnInit {
  private characterService = inject(CharacterService);
  private characterList = this.characterService.getCharacterList();
  private activeCharacter = this.characterService.getActiveCharacter();

  characters = computed<RichCharacterInfo[]>(() =>
    this.characterList().map((character) => ({
      ...character,
      bobbleheadCount: this.countCollectedBobbleheads(character),
      magazineCount: this.countCollectedMagazines(character),
      isActive: character.name === this.activeCharacter()?.name,
    }))
  );

  canDeleteCharacters = computed<boolean>(
    () => this.characterList().length > 1
  );

  ngOnInit() {
    this.characterService.loadSavedData();
  }

  deleteCharacter(character: CharacterInfo) {
    console.log("delete: ", character.name);
  }

  countCollectedBobbleheads(character: CharacterInfo) {
    return character.collectables.bobbleheads.size;
  }

  countCollectedMagazines(character: CharacterInfo) {
    const collectedIssuesLists = Array.from(
      character.collectables.magazines.values()
    );
    return collectedIssuesLists.reduce(
      (count, issues) => count + issues.size,
      0
    );
  }
}
