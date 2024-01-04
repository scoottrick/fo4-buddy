import { CommonModule } from "@angular/common";
import { Component, OnInit, computed, inject } from "@angular/core";
import {
  CharacterInfo,
  CharacterService,
} from "src/app/_shared/data-access/character.service";

type RichCharacterInfo = CharacterInfo & {
  bobbleheadCount: number;
  magazineCount: number;
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
        <h3>{{ character.name }}</h3>
        <p>
          Bobbleheads: {{ character.bobbleheadCount }} | Magazines:
          {{ character.magazineCount }}
        </p>
      </li>
    </ul>
  </ng-container>`,
  styles: ``,
})
export class CharactersPageComponent implements OnInit {
  private characterService = inject(CharacterService);
  private characterList = this.characterService.getCharacterList();

  characters = computed<RichCharacterInfo[]>(() =>
    this.characterList().map((character) => ({
      ...character,
      bobbleheadCount: this.countCollectedBobbleheads(character),
      magazineCount: this.countCollectedMagazines(character),
    }))
  );

  ngOnInit() {
    this.characterService.loadSavedData();
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
