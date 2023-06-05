import { Component, OnInit, inject } from "@angular/core";
import { combineLatest } from "rxjs";

import { BobbleheadService } from "../../data-access/bobblehead.service";
import { BobbleheadId } from "../../data-access/bobblehead";

@Component({
  selector: "fo-bobblehead-checklist",
  templateUrl: "./bobblehead-checklist.component.html",
  styles: [],
})
export class BobbleheadChecklistComponent implements OnInit {
  private bobbleheadService = inject(BobbleheadService);

  vm$ = combineLatest({
    bobbleheads: this.bobbleheadService.bobbleheads$,
    bobbleheadCollection: this.bobbleheadService.bobbleheadCollection$,
  });

  ngOnInit(): void {
    this.bobbleheadService.fetchData();
  }

  toggleBobblehead(id: BobbleheadId) {
    this.bobbleheadService.toggleFromCollection(id);
  }
}
