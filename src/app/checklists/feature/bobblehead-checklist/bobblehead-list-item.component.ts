import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BobbleheadObject } from "../../data-access/bobblehead";

@Component({
  selector: "fo-bobblehead-list-item",
  templateUrl: "./bobblehead-list-item.component.html",
})
export class BobbleheadListItem {
  @Input() collected: boolean = false;
  @Input() bobblehead?: BobbleheadObject;
  @Output() toggleCollected = new EventEmitter<void>();
}
